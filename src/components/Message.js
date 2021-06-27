import { Chip } from '@material-ui/core'
import React from 'react'

const Message = ({ text, replies, selectedReply, onResponseClick }) => {
  return (
    <div className='message'>
      <div className='message-text'>{text}</div>
      <div className='replies'>
        {replies.map((reply, index) => (
          <Chip
            key={index}
            style={{ marginLeft: 12, marginTop: 12 }}
            label={reply}
            color={selectedReply !== reply ? 'default' : 'primary'}
            disabled={selectedReply !== null}
            onClick={() => onResponseClick(reply)}
          />
        ))}
      </div>
    </div>
  )
}

export default Message
