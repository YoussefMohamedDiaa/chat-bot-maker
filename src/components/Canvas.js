import React, { useState, useRef, useContext } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background
} from 'react-flow-renderer'

import Sidebar from './Sidebar'

import './Flow.css'
import useEventListener from '../hooks/EventListener'
import EditorContext from '../context/EditorContext'

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

const Canvas = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elementInFocus, setElementInFocus] = useState(null)

  const [editorContext, setEditorContext] = useContext(EditorContext)

  const onConnect = (params) => {
    if (params.source === editorContext.startNodeId && startNodeHasEdge())
      return
    setEditorContext((prevEditorContext) => ({
      ...prevEditorContext,
      elements: addEdge(
        {
          ...params,
          type: 'smoothstep',
          label:
            params.source === editorContext.startNodeId
              ? ''
              : 'Click and write text here',
          arrowHeadType: 'arrowclosed'
        },
        prevEditorContext.elements
      )
    }))
  }

  const onElementClick = (event, element) => {
    setElementInFocus(element)
  }

  const onElementsRemove = (elementsToRemove) =>
    setEditorContext((prevEditorContext) => ({
      ...prevEditorContext,
      elements: removeElements(elementsToRemove, prevEditorContext.elements)
    }))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const startNodeExists = () => {
    if (editorContext.startNodeId === null) return false
    return editorContext.elements.find(
      (e) => e.id === editorContext.startNodeId
    )
  }

  const startNodeHasEdge = () => {
    if (!startNodeExists()) return false
    return editorContext.elements.find(
      (e) => e.source === editorContext.startNodeId
    )
  }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    })

    if (type === 'input' && startNodeExists()) return

    const newNode = createNode(type, position)

    setEditorContext((prevEditorContext) => ({
      ...prevEditorContext,
      startNodeId:
        type === 'input' ? newNode.id : prevEditorContext.startNodeId,
      elements: prevEditorContext.elements.concat(newNode)
    }))
  }

  const updateInFocusElement = (key) => {
    const updatedElements = editorContext.elements.map((e) => {
      if (
        e.id === elementInFocus.id &&
        e.source &&
        e.source !== editorContext.startNodeId
      )
        return {
          ...e,
          label: e.label === 'Click and write text here' ? key : e.label + key
        }
      if (e.id === elementInFocus.id && e.data)
        return {
          ...e,
          data: {
            ...e.data,
            label:
              e.data.label === 'Click and write text here'
                ? key
                : e.data.label + key
          }
        }
      return e
    })
    setEditorContext({ ...editorContext, elements: updatedElements })
  }

  const backspaceInFocusElement = () => {
    const deleteLastChar = (s) =>
      s.length > 0 ? s.substring(s, s.length - 1) : ''
    const updatedElements = editorContext.elements.map((e) => {
      if (e.id === elementInFocus.id && e.source)
        return { ...e, label: deleteLastChar(e.label) }
      if (e.id === elementInFocus.id && e.data)
        return {
          ...e,
          data: {
            ...e.data,
            label: deleteLastChar(e.data.label)
          }
        }
      return e
    })
    setEditorContext({ ...editorContext, elements: updatedElements })
  }

  const onKeyDown = ({ key }) => {
    if (key === 'Enter' || key === 'Escape' || elementInFocus === null) {
      setElementInFocus(null)
      return
    }
    if (elementInFocus.data && elementInFocus.data.label === 'Start') return
    if (key === 'ArrowLeft') {
      backspaceInFocusElement()
      return
    }
    if (key.length === 1) {
      updateInFocusElement(key)
    }
  }

  useEventListener('keydown', onKeyDown, document)

  return (
    <div className='canvas'>
      <Sidebar />
      <div className='dndflow'>
        <ReactFlowProvider>
          <div className='reactflow-wrapper' ref={reactFlowWrapper}>
            <ReactFlow
              elements={editorContext.elements}
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

export default Canvas
