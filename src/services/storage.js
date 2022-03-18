export class Storage {
  constructor(key) {
    this._key = key
    this._watchers = []
  }

  get state() {
    return this.get()
  }

  get() {
    if (!localStorage) return

    const value = localStorage.getItem(this._key)

    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(value) {
    if (!localStorage) return

    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    localStorage.setItem(this._key, value)

    this.notify()
  }

  subscribe(callback, options = {}) {
    this._watchers.push(callback)

    if (options.immediate) {
      this.notify()
    }
  }

  notify() {
    this._watchers.forEach(callback => callback(this.state))
  }

  clear() {
    if (!localStorage) return

    localStorage.removeItem(this._key)

    this.notify()
  }
}
