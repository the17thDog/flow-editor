import {jsPlumb} from 'jsplumb'
import {EventEmitter} from './eventEmitter'
import {EDITOR_EVENT} from './const'
import {NODE_REGISTER} from './node/register'

const editor = jsPlumb.getInstance({})
const eventEmitter = new EventEmitter()

export default class FlowEditor {
  constructor () {
    this.nodeStack = []
  }

  ready (callBack) {
    editor.bind('connection', ({sourceId, targetId}) => {
      const sourceNode = this.nodeStack.find(n => n.id === sourceId)
      if (
        sourceNode &&
        !sourceNode.transitions.map(t => t.next).includes(targetId)
      ) {
        sourceNode.transitions.push({next: targetId})
      }
    })

    return editor.ready(callBack)
  }

  on (event, listener) { eventEmitter.on(event, listener) }

  trigger (event, payload) { eventEmitter.trigger(event, payload) }

  createConnection (source, target) {
    editor.connect({ source, target })
  }

  addNode (type, offset = { x: 0, y: 0 }) {
    const NodeType = NODE_REGISTER[type]
    const nodeData = NodeType.inject(this)
    Object.assign(nodeData, {offset})

    this.nodeStack.push(nodeData)
    this.trigger(EDITOR_EVENT.CREATE_NODE, this.nodeStack)
    this.trigger(EDITOR_EVENT.NODE_STACK_CHANGE, this.nodeStack)
  }

  makeTarget (id, params = {}) {
    editor.makeTarget(id, params)
  }

  makeSource (id, params = {}) {
    editor.makeSource(id, params)
  }

  addEndpoint (id, params = {}) {
    editor.addEndpoint(id, params)
  }

  removeNode (nodeId) {
    this.nodeStack = this.nodeStack.filter(n => n.id !== nodeId)
    this.trigger(EDITOR_EVENT.REMOVE_NODE, this.nodeStack)
    this.trigger(EDITOR_EVENT.NODE_STACK_CHANGE, this.nodeStack)
  }

  repaintEverything () {
    editor.repaintEverything()
  }

  makeNodeDraggable (node, params = {}) {
    editor.draggable(node, params)
  }

  setPosition (nodeId, offset = { x: 0, y: 0 }) {
    const el = document.getElementById(nodeId)
    
    el.style.left = offset.x + 'px'
    el.style.top = offset.y + 'px'

    editor.revalidate(el)
  }

  makeUUID () {
    const randomMaker = (minNum, maxNum) => {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum * 10)
    }

    const uuids = new Set(this.nodeStack.map(n => n.id.split('_')[1]))
    while (true) {
      let n = randomMaker(0, 999)
      if (!uuids.has(n)) return n
    }
  }
}