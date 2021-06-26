import React from 'react'

const exampleChatList = [
  {
    text: 'How are you feeling today?',
    replies: ['Good', 'So So', 'Bad'],
    selectedReply: 'Good'
  },
  {
    text: 'Ok Very nice',
    replies: ['Thank You', 'Thanks'],
    selectedReply: null
  }
]

const otherExampleChatList = [
  {
    text: 'How are you feeling today?',
    replies: ['Good', 'So So', 'Bad'],
    selectedReply: 'Good'
  },
  {
    text: 'Ok Very nice',
    replies: ['Thank You', 'Thanks'],
    selectedReply: 'Thanks'
  },
  {
    text: 'Ok Very nice',
    replies: null,
    selectedReply: null
  }
]

// onResponseClick(response: String) gets called when a user clicks a reply.

const ChatView = ({ chatList, onResponseClick, onChatStart }) => {
  return <h1>Hello</h1>
}

export default ChatView
