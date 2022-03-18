import { ref, unref, computed } from 'vue'
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
    const ocurrences = Object.assign({}, unref(digitsMap))

    const result = []
    const invalidDigits = new Set()

    // Validate position
    guess.forEach((value, index) => {
      const digit = answer[index]

      if (value === digit) {
        result[index] = 2
        ocurrences[digit] -= 1
      }
    })

    // Validate ocurrence
    guess.forEach((value, index) => {
      const appearance = ocurrences[value]
      const hasValue = answer.includes(value)

      if (result[index]) return

      if (hasValue && appearance > 0) {
        result[index] = 1
        ocurrences[value] -= 1
      } else {
        result[index] = 0
      }

      if (!hasValue) invalidDigits.add(value)
    })

    return [result, Array.from(invalidDigits)]
  }

  return {
    loadChallenge,
    validateChallenge
  }
}
