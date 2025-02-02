import React from 'react'

function FunctionNames({functionNames}) {
  return (
    <div className="output">
                <h3>Extracted Function Names:</h3>
                <ul>
                    {functionNames.length > 0 ? (
                        functionNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))
                    ) : (
                        <p>No functions detected</p>
                    )}
                </ul>
            </div>
  )
}

export default FunctionNames