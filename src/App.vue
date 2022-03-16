<template>
  <div class="pi-app">
    <h1 class="pi-title">PI Digits</h1>

    <Guess
      v-for="line in 5"
      :key="line"
      :guess="guesses[line - 1]"
      :result="results[line - 1]"
    />

    <Keyboard />
  </div>
</template>

<script>
import { ref, onMounted, unref } from 'vue'

import { getDailyChallenge } from './services/pi.js'
import { useGuesses } from './services/guesses.js'
import keyboard from './services/keyboard.js'

import Guess from './components/Guess.vue'
import Keyboard from './components/Keyboard.vue'

export default {
  components: {
    Guess,
    Keyboard
  },
  setup() {
    const challenge = ref('')

    const { guesses, results, addDigit, removeDigit, guess } = useGuesses()

    const handlers = {
      enter: (key, digits) => guess(digits),
      backspace: () => removeDigit(),
      default: (key) => addDigit(key)
    }

    onMounted(async () => challenge.value = await getDailyChallenge())

    keyboard.subscribe(key => {
      const digits = unref(challenge)

      if (handlers[key])
        return handlers[key](key, digits)

      return handlers['default'](key, digits)
    })

    return {
      guesses,
      results
    }
  }
}
</script>

<style scoped>
.pi-app {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.pi-title {
  text-align: center;
  font-size: 4.8rem;
  color: var(--white-color);
  margin: 0 0 1.6rem;
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
  padding: 6rem 0;
  font-size: 1.6rem;
}
</style>
