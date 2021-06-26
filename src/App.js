import React, { useState } from 'react'
import './App.css'
import EditorContext from './context/EditorContext'
import Canvas from './components/Canvas'
import Chat from './components/Chat'

const defaultEditorContext = {
  elements: [],
  startNodeId: null,
  isValidProgram: true
}

function App() {
  const [editorContext, setEditorContext] = useState(defaultEditorContext)
  return (
    <EditorContext.Provider value={[editorContext, setEditorContext]}>
      <Chat />
      <Canvas />
    </EditorContext.Provider>
  )
}

export default App
