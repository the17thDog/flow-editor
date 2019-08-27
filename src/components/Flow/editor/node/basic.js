export default class AbstractNode {
  static inject (editor) {
    const o = new this(editor)
    o.makeUUId(editor)
    return o
  }

  constructor (editor) {
    this.MAIN_COLOR = 'salmon'
    this.id = ''
    this.label = '节点节点'
    this.userData = {}
    this.transitions = [{
      label: '端口1',
      name: 'port1',
      uuid: 'port1',
      next: null,
      userData: {}
    }]
  }

  makeUUId (editor) {
    this.id = `${this.constructor.getType()}_${editor.makeUUID()}`
  }
}