import React from 'react'
import './index.less'

const NodeDragger = (props) => {
  const handleDragOver = e => {
    e.preventDefault()
  }

  const nodeList = [{ label: '微信节点', type: 'WeChatNode' }, { label: '短信节点', type: 'SmsNode' }]
  return (
    <div className="node-dragger">{
      nodeList.map((node, i) => (
        <div
          key={i}
          data-type={node.type}
          draggable="true"
          className="node-dragger__item"
          onDragOver={handleDragOver}
        >{node.label}</div>
      ))
    }</div>
  )
}

export default NodeDragger