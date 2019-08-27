import AbstractNode from './basic'

export default class ActionsNode extends AbstractNode {
  static getType () { return 'ActionNode' }

  constructor (editor) {
    super(editor)
    this.MAIN_COLOR = 'salmon'
  }
}

export class WeChatNode  extends ActionsNode {
  static getType () { return 'WeChatNode' }

  constructor (editor) {
    super()
    this.label = 'do what'
    this.transitions = [{
      label: '端口1',
      name: 'port1',
      uuid: 'port1',
      next: null,
      userData: {}
    }]
  }
}

export class SmsNode  extends ActionsNode {
  static getType () { return 'SmsNode' }

  constructor (editor) {
    super()
    this.label = 'do something'
    this.MAIN_COLOR = 'lightblue'
    this.transitions = [{
      label: '端口1',
      name: 'port1',
      uuid: 'port1',
      next: null,
      userData: {}
    }]
  }
}