import React, { useEffect } from 'react'
import { lineStyle } from '../../setting'
import './index.less'

const Node = (props) => {
  const { editor, id, label, onClick, transitions, MAIN_COLOR, offset } =  props

  useEffect(() => {
    editor.makeTarget(id, {
      filter: 'span',
      maxConnections: 1,
      anchor: 'Left',
      allowLoopback: false,
      ...lineStyle
    })
    editor.makeSource(id, {
      filter: '.drag-area',
      maxConnections: -1,
      anchor: 'Right',
      allowLoopback: false,
      ...lineStyle
    })

    editor.makeNodeDraggable(id)
    transitions.forEach(t => {
      if (t.next) editor.createConnection(id, t.next)
    })
  }, [editor, transitions, id])

  return (
    <div
      id={id}
      className="flow-node"
      style={{
        left: offset.x,
        top: offset.y,
        backgroundColor: MAIN_COLOR
      }}
      onClick={onClick}
    >
      <span>{label}</span>
      <div className="drag-area"></div>
    </div>
  )
}

export default Node