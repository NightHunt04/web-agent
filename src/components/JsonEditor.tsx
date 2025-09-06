import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import Prism from "prismjs"
import 'prismjs/components/prism-json'
// import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/themes/prism-tomorrow.css'

interface JsonEditorProps {
  initialJson?: string
  onChange?: (json: any) => void
  readOnly?: boolean
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  initialJson = '{}',
  onChange,
  readOnly = false
}) => {
  const [code, setCode] = useState(initialJson);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newCode: string) => {
    setCode(newCode);
    try {
      const parsed = JSON.parse(newCode);
      setError(null);
      onChange?.(parsed);
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div style={{
        borderRadius: 10,
        border: 'none',
        overflow: 'hidden',
        background: '#272822',
        fontFamily: 'monospace',
        position: 'relative',
        width: '100%',
        maxHeight: '400px',
        overflowY: 'auto',
        ...(readOnly ? {} : { minHeight: 200 }) 
      }}>

      <Editor
        value={code}
        onValueChange={readOnly ? () => {} : handleChange}
        highlight={code =>
          Prism.highlight(code, Prism.languages.json, 'json')
        }
        padding={12}
        style={{
          backgroundColor: '#1f1f19',
          color: '#fff',
          fontSize: 12,
          borderRadius: '10px',
          border: 'none',
          outline: 'none',
          fontFamily: 'monospace',
          maxHeight: '400px',
          overflowY: 'auto',
          caretColor: '#f8f8f2',
          ...(readOnly ? {} : { minHeight: 200 }) 
        }}
        textareaId='json-editor'
        textareaClassName='outline-none border-none w-full'
      />
      {error && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '4px 8px',
            backgroundColor: 'rgba(255,0,0,0.2)',
            color: '#f00',
            fontSize: 12,
          }}
        >
          JSON Error: {error}
        </div>
      )}
    </div>
  )
}