import CodeMirror from '@uiw/react-codemirror';
function CodeBox({file}){
    return (
        <div className='codemirror'>
            <CodeMirror
                value={file}
                height="400px" 
                style={{overflow:'auto'}}
                options={{
                    mode: "python",  
                    theme: "default", 
                }}
                editable={false}
            />
        </div>
    )
} 
export default CodeBox