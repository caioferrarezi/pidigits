<template>
  <div class="pi-app">
    <h1 class="pi-title">PI Digits</h1>

    <div class="pi-board">
      <Guess
        v-for="line in 5"
        :key="line"
        :guess="guesses[line - 1]"
        :result="results[line - 1]"
      />
    </div>

    <Keyboard :disabled="won" />
  </div>
</template>

<script>
import { watch, onMounted, computed } from 'vue'

import { useGame } from './application/game.js'
import { useKeyboard } from './application/keyboard.js'
import { useChallenge } from './application/challenge.js'

import Guess from './components/Guess.vue'
import Keyboard from './components/Keyboard.vue'

export default {
  components: {
    Guess,
    Keyboard
  },
  setup() {
    const {
      setDisabledKeys,
      addKeyboardListener,
      destroyKeyboard
    } = useKeyboard()

    const {
      row, guesses, results,
      addDigit, removeDigit, addResult
    } = useGame()

    const {
      loadChallenge,
      validateChallenge
    } = useChallenge()

    const guess = computed(() => guesses.value[row.value])
    const result = computed(() => results.value[row.value - 1])

    const won = computed(() => !!result.value?.every(value => value === 2))

    const add = (key) => {
      addDigit(key)
    }

    const remove = () => {
      removeDigit()
    }

    const validate = () => {
      const [result, invalidDigits] = validateChallenge(guess.value)

      addResult(result)
      setDisabledKeys(invalidDigits)
    }

    const handlers = {
      default: add,
      backspace: remove,
      enter: validate
    }

    addKeyboardListener(key => {
      (handlers[key] || handlers['default'])(key, guess.value)
    })

    watch(won, (value) => {
      value && destroyKeyboard()
    }, { immediate: true })

    onMounted(async () => await loadChallenge())

    return {
      won,
      guesses,
      results
    }
  }
}
</script>

<style scoped>
.pi-app {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: .8rem 0;
}

.pi-board {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.pi-title {
  text-align: center;
  font-size: 2.4rem;
  color: var(--white-color);
  margin: 0 0 1.6rem;
}

@media screen and (min-width: 375px) {
  .pi-app {
    padding: 1.6rem 0;
  }

  .pi-title {
    font-size: 3.2rem;
    margin: 0 0 1.6rem;
  }
}

@media screen and (min-width: 786px) {
  .pi-board {
    gap: .8rem;
  }

  .pi-title {
    font-size: 4rem;
  }
}
</style>

<style>
:root {
  --green-color: #3AB795;
  --yellow-color: #FF950A;
  --red-color: #D05353;
  --black-color: #191919;
  --gray-color: #3D3D3D;
  --light-gray-color: #525252;
  --white-color: #E0E0E0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 62.5%;
}

body {
  background: var(--black-color);
  box-sizing: border-box;
  font-size: 1.6rem;
}
</style>
