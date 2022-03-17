export class Storage {
  constructor(key) {
    this._key = key
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
  }

  clear() {
    if (!localStorage) return

    localStorage.removeItem(this._key)
  }
}
