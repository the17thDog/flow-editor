import React, {useEffect} from 'react'
import Nodes from '../Nodes'
import './index.less'

const Graph = (props) => {
  return (
    <div className="node-wrapper" id="flow-container">
      <Nodes>
        {props.children}
      </Nodes>
    </div>
  )
}

export default Graph