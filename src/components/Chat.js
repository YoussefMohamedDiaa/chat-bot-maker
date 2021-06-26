import { useContext, useState } from 'react'
import EditorContext from '../context/EditorContext'
import ChatView from './ChatView'

function Chat() {
  const [editorContext, _] = useContext(EditorContext)
  const [chatList, setChatList] = useState([])
  const [currentNodeId, setCurrentNodeId] = useState(null)

  const getPossibleReplies = (currentNodeId) => {
    return editorContext.elements
      .filter((e) => e.source && e.source === currentNodeId)
      .map((e) => e.label)
  }

  const getNextNode = (currentNodeId, response) => {
    const nextNodeIds = editorContext.elements.filter(
      (e) => e.source && e.source === currentNodeId && e.label === response
    )
    return { id: nextNodeIds[0].id, text: nextNodeIds[0].label }
  }

  const onChatStart = () => {
    const nextNode = getNextNode(editorContext.startNodeId, '')
    const nextNodeReplies = getPossibleReplies(nextNode.id)
    const newMessage = {
      text: nextNode.text,
      replies: nextNodeReplies,
      selectedReply: null
    }

    setCurrentNodeId(nextNode.id)
    setChatList([newMessage])
  }

  const onResponseClick = (response) => {
    const lastMessage = chatList[chatList.length - 1]
    const updatedLastMessage = { ...lastMessage, selectedReply: response }

    const nextNode = getNextNode(currentNodeId, response)
    const nextNodeReplies = getPossibleReplies(nextNode.id)
    const newMessage = {
      text: nextNode.text,
      replies: nextNodeReplies,
      selectedReply: null
    }

    setCurrentNodeId(nextNode.id)
    setChatList([...chatList.slice(0, -1), updatedLastMessage, newMessage])
  }

  return (
    <div className='chat'>
      <ChatView
        chatList={chatList}
        onResponseClick={onResponseClick}
        onChatStart={onChatStart}
      />
    </div>
  )
}

export default Chat
