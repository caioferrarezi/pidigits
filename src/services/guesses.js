import { computed, reactive, ref, unref, watch } from "vue";

export function useGuesses() {
  const row = ref(0)
  const column = ref(0)

  const guesses = reactive([[], [], [], [], []])
  const results = reactive([[], [], [], [], []])
  const isLineFull = computed(() => column.value > 4)

  const addDigit = (digit) => {
    const x = unref(row)
    const y = unref(column)

    if (/\d/.test(digit) && !isLineFull.value) {
      guesses[x][y] = digit

      column.value += 1
    }
  }

  const removeDigit = () => {
    const x = unref(row)

    guesses[x].pop()

    column.value -= 1
  }

  const guess = (digits) => {
    if (!isLineFull.value) return

    const x = unref(row)

    results[x] = validate(digits, guesses[x])

    row.value += 1
  }

  const validate = (digits, guess) => {
    const digitsMap = digits.split('').reduce((object, value) => {
      if (object[value])
        object[value] += 1
      else
        object[value] = 1

      return object
    }, {})

    const results = []

    guess.forEach((value, index) => {
      const digit = digits[index]

      if (value === digit) {
        results[index] = 2
        digitsMap[digit] -= 1
      }
    })

    guess.forEach((value, index) => {
      const ocurrences = digitsMap[value]

      if (digits.includes(value) && ocurrences > 0) {
        results[index] = 1
        digitsMap[value] -= 1
      } else if (!results[index]) {
        results[index] = 0
      }
    })

    return results
  }

  watch(row, () => column.value = 0)

  return {
    guesses,
    results,
    addDigit,
    removeDigit,
    guess
  }
}
