import React from 'react'

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className='description'>
        <strong>How it works?</strong>
        <br />
        <br />
        Drag and drop the needed node for using it. The start node is the
        beginning of the dialog, switch node for having a message from the
        chatbot that the user can reply to with different messages, and the
        message node is the final output of the chatbot.
        <br />
        <br />
        <strong>Controls</strong>
        <ul>
          <li>
            <em>Click</em> on an element to select it
          </li>
          <li>
            <em>Backspace:</em> deletes selected element (node or edge)
          </li>
          <li>
            <em>Left Arrow:</em> deletes written text of selected element
          </li>
          <li>
            <em>Enter:</em> Unselects an element
          </li>
        </ul>

      </div>
      <div
        className='dndnode input'
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Start Node
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Switch Node
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Message
      </div>
    </aside>
  )
}

export default Sidebar
