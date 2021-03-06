class Keyboard {
  constructor() {
    this._watchers = []
    this._disabledKeys = []

    this._listener = ({ key }) => {
      this.notify(key.toLocaleLowerCase())
    }

    window.addEventListener('keyup', this._listener)
  }

  disable(keys) {
    this._disabledKeys.push(...keys)

    return this._disabledKeys
  }

  subscribe(callback) {
    this._watchers.push(callback)
  }

  notify(key) {
    if (this._disabledKeys.includes(key)) return

    this._watchers.forEach(callback => callback(key))
  }

  destroy() {
    window.removeEventListener('keyup', this._listener)

    this._watchers.length = 0
  }
}

export default Object.freeze(new Keyboard())
