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

    <Keyboard />
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'

import { getDailyChallenge } from './services/pi.js'
import { useGame } from './services/game.js'
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

    const {
      won, guesses, results,
      addDigit, removeDigit, guess
    } = useGame()

    const handlers = {
      enter: (key, challenge) => guess(challenge),
      backspace: () => removeDigit(),
      default: (key) => addDigit(key)
    }

    keyboard.subscribe(key => {
      if (handlers[key])
        handlers[key](key, challenge.value)
      else
        handlers['default'](key, challenge.value)
    })

    watch(won, (value) => value && keyboard.destroy(), { immediate: true })

    onMounted(async () => {
      challenge.value = await getDailyChallenge()
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
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 1.6rem 0;
}

.pi-board {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.pi-title {
  text-align: center;
  font-size: 3.2rem;
  color: var(--white-color);
  margin: 0 0 1.6rem;
}

@media screen and (min-width: 786px) {
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
