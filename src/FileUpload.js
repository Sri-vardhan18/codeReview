import React from 'react'

function FileUpload({file, setFile}) { 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFile(reader.result); // Set file content as string
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsText(file); // Read the content of the file as text
        }
    }; 

  return (
    <input type="file" accept=".py" onChange={handleFileChange} />
  )
}

export default FileUpload