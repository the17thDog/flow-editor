import React, { useState, useEffect } from 'react'
import FlowEditor from './editor'
import {EDITOR_EVENT} from './editor/const'
import Graph from './components/Graph'
import Node from './components/Node'

const editor = new FlowEditor()

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

  function addNode () {
    editor.addNode({ label: '人群节点', id: 'node3' })
  }

  function renderNode () {
    return nodes.map(({ label, id }, i) => (
      <Node key={i} id={id}>{label}</Node>
    ))
  }
  
  return (
    <>
      <Graph
        editor={editor}
      >
        {renderNode()}
      </Graph>

      <div onClick={addNode}>点击我</div>
    </>
  )
}

export default Flow