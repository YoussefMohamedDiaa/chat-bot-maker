import { Button, List } from '@material-ui/core'
import React from 'react'
import Message from './Message'

const ChatView = ({ chatList, onResponseClick, onChatStart }) => {
  return (
    <div className='chat-view'>
      <List
        style={{
          maxHeight: 'calc(0.8 * (90vh - 64px));',
          overflow: 'auto'
        }}
      >
        {chatList.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            replies={message.replies}
            selectedReply={message.selectedReply}
            onResponseClick={onResponseClick}
          />
        ))}
      </List>
      <Button
        style={{
          background: '#4ECB71',
          borderRadius: 50,
          color: '#ffffff',
          padding: 16,
          paddingTop: 12,
          paddingBottom: 12,
          fontWeight: 'bold'
        }}
        onClick={onChatStart}
      >
        {'Press to start new chat'}
      </Button>
    </div>
  )
}

export default ChatView
