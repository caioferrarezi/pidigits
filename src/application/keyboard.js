import { ref } from 'vue'

import keyboard from '../services/keyboard'
import keyboardRepository from '../repositories/keyboard'

export function useKeyboard() {
  const disabledKeys = ref([])

  const setDisabledKeys = (keys) => {
    keyboardRepository.save(keyboard.disable(keys))
  }

  const notifyKeyboard = (key) => {
    keyboard.notify(key)
  }

  const addKeyboardListener = (callback) => {
    keyboard.subscribe(callback)
  }

  const destroyKeyboard = () => {
    keyboard.destroy()
  }

  keyboardRepository.subscribe(state => {
    disabledKeys.value = state || []
  }, { immediate: true })

  return {
    disabledKeys,
    setDisabledKeys,
    notifyKeyboard,
    addKeyboardListener,
    destroyKeyboard
  }
}
