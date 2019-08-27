import React, { useState, useEffect } from 'react'
import FlowEditor from './editor'
import {EDITOR_EVENT} from './editor/const'
import Graph from './components/Graph'
import NodeDragger from './components/NodeDragger'
import Node from './components/Node'

const editor = new FlowEditor()
window.editor = editor

const Flow = () => {
  let [nodes, setNodes] = useState(editor.nodeStack)

  useEffect(() => {
    editor.ready(() => {
      editor.repaintEverything()
    })
  }, [nodes])

  editor.on(EDITOR_EVENT.NODE_STACK_CHANGE, nodeStack => { // 节点改变
    setNodes([...nodeStack])
  })

  function handleNodeClick (id) {
    const node = nodes.find(n => n.id === id)
    console.log(node)
  }

  function handleDragEnd (e) {
    const { clientX, clientY, target } = e
    const nodeType = target.dataset.type

    editor.addNode(nodeType, {
      x: clientX,
      y: clientY
    })
  }

  function renderNode () {
    return nodes.map((nodeData, i) => (
      <Node
        key={i}
        editor={editor}
        {...nodeData}
        onClick={() => handleNodeClick(nodeData.id)}
      ></Node>
    ))
  }
  
  return (
    <div
      className="flow-wrapper"
      style={{display: 'flex'}}
      onDragEnd={handleDragEnd}
    >
      <NodeDragger />

      <Graph editor={editor}>{renderNode()}</Graph>
    </div>
  )
}

export default Flow