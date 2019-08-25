// 观察者模式
export class EventEmitter {
  constructor () {
    this.watcher = {}
  }

  addListener (event, listener) {
    if (!this.watcher[event]) {
      this.watcher[event] = []
    }

    if (this.watcher[event].indexOf(listener) >= 0) return

    this.watcher[event].push(listener)
    return this
  }

  on (event, listener) {
    return this.addListener(event, listener)
  }

  removeListener (event, listener) {
    if (!this.watcher[event]) return

    const idx = this.watcher[event].indexOf(listener)
    if (idx < 0) return

    this.watcher[event].splice(idx, 1)

    return this
  }

  off (event, listener) {
    return this.removeListener(event, listener)
  }

  addOnceListener (event, listener) {
    const onceWrapper = () => {
      listener()
      this.removeListener(event, onceWrapper)
    }
    return this.addListener(event, onceWrapper)
  }

  removeEvent (event) {
    delete this.watcher[event]
    return this
  }

  emitEvent (event, payload) {
    if (!this.watcher[event]) return
    this.watcher[event].map(f => f(payload))
    
    return this
  }

  trigger (event, payload) { return this.emitEvent(event, payload) }
}
