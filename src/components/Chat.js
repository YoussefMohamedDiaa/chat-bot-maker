import { useContext, useState } from 'react'
import EditorContext from '../context/EditorContext'
import ChatView from './ChatView'

function Chat() {
  const [editorContext, setEditorContext] = useContext(EditorContext)
  const [currentNode, setCurrentNode] = useState(null)

  const onResponseClick = (response) => {
    console.log('User chose:', response)
  }

  const onChatStart = (response) => {
    console.log('User started chat')
  }

  return (
    <div className='chat'>
      <ChatView
        chatList={[]}
        onResponseClick={onResponseClick}
        onChatStart={onChatStart}
      />
    </div>
  )
}

export default Chat
