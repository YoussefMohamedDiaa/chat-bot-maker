import React, { useState, useRef, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background
} from 'react-flow-renderer'

import Sidebar from './Sidebar'

import './flow.css'

const initialElements = []

let id = 0
const getId = () => `dndnode_${id++}`

const createNode = (type, position) => {
  const style = {
    height: '20px',
    padding: '4px',
    border: '1px solid #1a192b',
    borderRadius: '2px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab'
  }
  let label = 'Click and write text here'

  if (type === 'input') {
    style.backgroundColor = '#4ECB71'
    style.fontWeigh = 'bold'
    label = 'Start'
  }

  if (type === 'output') {
    style.backgroundColor = '#D99Bff'
  }

  return {
    id: getId(),
    type,
    position,
    data: { label },
    style
  }
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState(initialElements)
  const [elementInFocusId, setElementInFocusId] = useState(null)

  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          type: 'smoothstep',
          label: 'Click and write text here',
          arrowHeadType: 'arrowclosed'
        },
        els
      )
    )

  const onElementClick = (event, element) => {
    setElementInFocusId(element.id)
    console.log('click', element.id)
  }

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    })
    const newNode = createNode(type, position)

    setElements((es) => es.concat(newNode))
  }

  const updateInFocusElement = (key) => {
    const updatedElements = elements.map((e) => {
      if (e.id === elementInFocusId) return { ...e, label: e.label + key }
      return e
    })
    console.log(updateInFocusElement)
    setElements(updatedElements)
  }

  const onKeyDown = ({ key }) => {
    console.log(1)
    if (key === 'Enter' || elementInFocusId === null) {
      console.log(key, elementInFocusId)
      setElementInFocusId(null)
      return
    }
    console.log(2)
    if (key.length === 1) updateInFocusElement(key)
    console.log(3)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => document.addEventListener('keydown', onKeyDown), [])

  return (
    <div className='canvas'>
      <Sidebar />
      <div className='dndflow'>
        <ReactFlowProvider>
          <div className='reactflow-wrapper' ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementClick={onElementClick}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid={true}
              snapGrid={[15, 15]}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default DnDFlow
