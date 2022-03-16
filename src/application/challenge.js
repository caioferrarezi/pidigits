import { computed, ref, unref } from 'vue'
import { getDailyChallenge } from '../services/challenge.js'

export function useChallenge() {
  const challenge = ref('')
  const digitsMap = computed(
    () => challenge.value.split('').reduce((object, value) => {
      if (object[value])
        object[value] += 1
      else
        object[value] = 1

      return object
    }, {})
  )

  const loadChallenge = async () => {
    challenge.value = await getDailyChallenge()
  }

  const validateChallenge = (guess) => {
    const answer = unref(challenge)
    const ocurrences = unref(digitsMap)

    const results = []

    guess.forEach((value, index) => {
      const digit = answer[index]

      if (value === digit) {
        results[index] = 2
        ocurrences[digit] -= 1
      }
    })

    guess.forEach((value, index) => {
      const appearance = ocurrences[value]

      if (answer.includes(value) && appearance > 0) {
        results[index] = 1
        ocurrences[value] -= 1
      } else if (!results[index]) {
        results[index] = 0
      }
    })

    return results
  }

  return {
    loadChallenge,
    validateChallenge
  }
}
