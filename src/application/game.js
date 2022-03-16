import { computed, reactive, ref, unref, watch, watchEffect } from 'vue'

import { Storage } from '../utils/storage'
import { DATE } from '../utils/constants'

const STATE_STORAGE_KEY = 'state'

export function useGame() {
  const stateStorage = new Storage(STATE_STORAGE_KEY)
  const state = stateStorage.get()

  const guesses = reactive(state?.guesses || [[], [], [], [], []])
  const results = reactive(state?.results || [[], [], [], [], []])

  const row = ref(state?.x || 0)
  const column = ref(state?.y || 0)

  const guess = computed(() => {
    const x = unref(row)

    return guesses[x]
  })

  const isLineFull = computed(() => column.value > 4)

  const won = computed(() => {
    const x = unref(row) - 1
    const result = results[x]

    return !!result?.every(value => value === 2)
  })

  const addDigit = (digit) => {
    const x = unref(row)
    const y = unref(column)

    if (/\d/.test(digit) && !isLineFull.value) {
      guesses[x][y] = digit

      column.value = Math.min(column.value + 1, 5)
    }
  }

  const removeDigit = () => {
    const x = unref(row)

    guesses[x].pop()

    column.value = Math.max(0, column.value - 1)
  }

  const addResult = (result) => {
    if (!isLineFull.value) return

    const x = unref(row)

    results[x] = result

    row.value += 1
    column.value = 0
  }

  const saveState = () => {
    const date = DATE

    const x = unref(row)
    const y = unref(column)

    stateStorage.set({ date, x, y, guesses, results })
  }

  watch(row, () => saveState())
  watch(column, () => saveState())

  return {
    won,
    guess,
    guesses,
    results,
    addDigit,
    removeDigit,
    addResult
  }
}
