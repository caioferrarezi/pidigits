import { reactive, toRefs, watch } from 'vue'

import gameRepository from '../repositories/game'

import { useGlobalState } from './global'

export function useGame() {
  const { hasPassedDate } = useGlobalState()

  const state = reactive(gameRepository.state || {})

  const addDigit = (digit) => {
    const isLineFull = state.column > 4

    if (/\d/.test(digit) && !isLineFull) {
      const { row, column } = state

      state.guesses[row][column] = digit

      state.column = Math.min(column + 1, 5)
    }
  }

  const removeDigit = () => {
    const { row, column } = state

    state.guesses[row].pop()

    state.column = Math.max(0, column - 1)
  }

  const addResult = (result) => {
    const isLineFull = state.column > 4

    if (isLineFull) {
      const { row } = state

      state.results[row] = result

      state.row += 1
      state.column = 0
    }
  }

  watch(
    () => state,
    (state) => {
      gameRepository.save(state)
    },
    { deep: true }
  )

  watch(
    hasPassedDate,
    (value) => {
      if (!value) return

      state.row = 0
      state.column = 0
      state.guesses = [[], [], [], [], []]
      state.results = [[], [], [], [], []]
    },
    { immediate: true }
  )

  return {
    ...toRefs(state),
    addDigit,
    removeDigit,
    addResult
  }
}
