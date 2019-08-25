import React from 'react'
import Nodes from '../Nodes'

const Graph = (props) => {
  const { editor } = props

  return (
    <div className="node-wrapper">
      <Nodes editor={editor}>
        {props.children}
      </Nodes>
    </div>
  )
}

export default Graph