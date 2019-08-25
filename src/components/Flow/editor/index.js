import {jsPlumb} from 'jsplumb'
import {EventEmitter} from './eventEmitter'
import {EDITOR_EVENT} from './const'

const editor = jsPlumb.getInstance({})
const eventEmitter = new EventEmitter()

export default class FlowEditor {
  constructor () {
    this.nodeStack = [{ id: 'node1', label: '条件节点' }, { id: 'node2', label: '触发节点' }]
  }

  ready (callBack) {
    return editor.ready(callBack)
  }

  on (event, listener) { eventEmitter.on(event, listener) }

  trigger (event, payload) { eventEmitter.trigger(event, payload) }

  addNode (data) {
    this.nodeStack.push(data)
    this.trigger(EDITOR_EVENT.CREATE_NODE, this.nodeStack)
    this.trigger(EDITOR_EVENT.NODE_STACK_CHANGE, this.nodeStack)
  }

  repaintEverything () {
    editor.repaintEverything()
  }

  makeNodeDraggable (node, params = {}) {
    editor.draggable(node, params)
  }
}