import { computed, reactive, ref, unref, watch } from 'vue'

import { Storage } from '../utils/storage'

const STATE_STORAGE_KEY = 'state'

export function useGame() {
  const stateStorage = new Storage(STATE_STORAGE_KEY)
  const state = stateStorage.get()

  const guesses = reactive(state?.guesses || [[], [], [], [], []])
  const results = reactive(state?.results || [[], [], [], [], []])

  const row = ref(state?.x || 0)
  const column = ref(state?.y || 0)

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

      column.value += 1

      saveState()
    }
  }

  const removeDigit = () => {
    const x = unref(row)

    guesses[x].pop()

    column.value -= 1

    saveState()
  }

  const guess = (challenge) => {
    if (!isLineFull.value) return

    const x = unref(row)

    results[x] = validate(challenge, guesses[x])

    row.value += 1

    saveState()
  }

  const validate = (challenge, guess) => {
    const digitsMap = challenge.split('').reduce((object, value) => {
      if (object[value])
        object[value] += 1
      else
        object[value] = 1

      return object
    }, {})

    const results = []

    guess.forEach((value, index) => {
      const digit = challenge[index]

      if (value === digit) {
        results[index] = 2
        digitsMap[digit] -= 1
      }
    })

    guess.forEach((value, index) => {
      const ocurrences = digitsMap[value]

      if (challenge.includes(value) && ocurrences > 0) {
        results[index] = 1
        digitsMap[value] -= 1
      } else if (!results[index]) {
        results[index] = 0
      }
    })

    return results
  }

  const saveState = () => {
    const x = unref(row)
    const y = unref(column)

    stateStorage.set({ x, y, guesses, results })
  }

  watch(row, () => column.value = 0)

  return {
    won,
    guesses,
    results,
    addDigit,
    removeDigit,
    guess
  }
}
