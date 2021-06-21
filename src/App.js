import React from 'react'
import './App.css'
import Canvas from './components/Canvas'
import Chat from './components/Chat'

function App() {
  return (
    <React.Fragment>
      <Chat />
      <Canvas />
    </React.Fragment>
  )
}

export default App
