import { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

function Editor({ value, onChange }) {
  const handleChange = useCallback(
    (value) => {
      onChange(value)
    },
    [onChange]
  )

  const extensions = [
    markdown({
      base: markdownLanguage,
      codeLanguages: languages
    })
  ]

  return (
    <div className="editor">
      <CodeMirror
        value={value}
        height="100%"
        extensions={extensions}
        onChange={handleChange}
        theme="dark"
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false
        }}
      />
    </div>
  )
}

export default Editor
