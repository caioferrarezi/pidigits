import { ref, watch } from 'vue'

import keyboard from '../services/keyboard'
import keyboardRepository from '../repositories/keyboard'

import { useGlobalState } from './global'

export function useKeyboard() {
  const { hasPassedDate } = useGlobalState()

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

  watch(
    hasPassedDate,
    (value) => {
      if (!value) return

      keyboardRepository.clear()
    },
    { immediate: true }
  )

  return {
    disabledKeys,
    setDisabledKeys,
    notifyKeyboard,
    addKeyboardListener,
    destroyKeyboard
  }
}
