import React, { useEffect } from 'react'
import './index.less'

const Node = (props) => {
  const { editor, id } =  props

  useEffect(() => {
    editor.makeNodeDraggable(id)
  }, [id])

  return (
    <div
      id={id}
      className="flow-node"
    >{props.children}</div>
  )
}
export default Node