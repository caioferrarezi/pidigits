import { computed, reactive, watch } from 'vue'

import { DATE } from '../utils/constants'
import globalRepository from '../repositories/global'

const instance = createGlobalState()

function createGlobalState() {
  const state = reactive(globalRepository.state || {})

  const hasPassedDate = computed(() => {
    const actual = new Date(state?.date || null)
    const today = new Date(new Date().toDateString())

    return actual < today
  })

  watch(
    hasPassedDate,
    (value) => value && globalRepository.set({ date: DATE }),
    { immediate: true }
  )

  return {
    hasPassedDate
  }
}

export function useGlobalState() {
  return instance
}
