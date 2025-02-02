import React, { useState, useEffect } from "react";
import CodeBox from "./Codebox";
import FileUpload from "./FileUpload";
import FunctionNames from "./FunctionNames";
import './App.css'


function App() {
  const [file, setFile] = useState(""); 
  const [functionNames, setFunctionNames] = useState([]);
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);

cd 
  useEffect(() => {
    const loadPyodideLib = async () => {
      if (window.loadPyodide) {
        const pyodideInstance = await window.loadPyodide();
        setPyodide(pyodideInstance);
        setLoading(false);
      } else {
        console.error("Pyodide failed to load.");
      }
    };

    loadPyodideLib();
  }, []);

  const handleParse = async () => {
    if (!file) {
      alert("Please upload a Python file.");
      return;
    }

    setLoading(true);
    try {
      const pythonScript = `
import ast

def extract_function_names(code):
    try:
        tree = ast.parse(code)
        return [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
    except SyntaxError:
        return ["Invalid Python Code"]

# Parse the provided Python code
code = '''${file}'''
extract_function_names(code)
`;

      
      const result = await pyodide.runPythonAsync(pythonScript);
      setFunctionNames(result.toJs()); 
    } catch (error) {
      console.error("Error parsing file:", error);
      setFunctionNames(["Error parsing file"]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Python Code Parsing Platform</h2>
      <div className="containerbox">
        <div className="sidebar">
          <FileUpload file={file} setFile={setFile} />
          <button onClick={handleParse} disabled={loading || !file}>
            {loading ? "Loading..." : "Upload & Parse"}
          </button>
        </div>
        <div className="main">
          <CodeBox file={file} />
          <FunctionNames functionNames={functionNames} />
        </div>
      </div>
    </div>
  );
}

export default App;
