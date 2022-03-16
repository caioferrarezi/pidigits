import keyboard from '../services/keyboard'

export function useKeyboard() {
  const addKeyboardListener = (callback) => {
    keyboard.subscribe(callback)
  }

  const destroyKeyboard = () => {
    keyboard.destroy()
  }

  return {
    addKeyboardListener,
    destroyKeyboard
  }
}
