class Keyboard {
  constructor() {
    this.watchers = []

    window.addEventListener('keyup', ({ key }) => {
      this.notify(key.toLocaleLowerCase())
    })
  }

  get instance() {
    return this
  }

  subscribe(callback) {
    this.watchers.push(callback)
  }

  notify(key) {
    this.watchers.forEach(callback => callback(key))
  }
}

export default Object.freeze(new Keyboard())
