<template>
  <div class="pi-keyboard">
    <button
      v-for="key in keys"
      :key="key.code"
      :class="[
        'pi-keyboard__button',
        `-code-${key.code}`
      ]"
      @click="handleClick(key.code)"
    >
      {{ key.text }}
    </button>
  </div>
</template>

<script>
import { readonly } from 'vue'
import { KEYS } from '../utils/constants'
import keyboard from '../services/keyboard'

export default {
  setup() {
    const keys = readonly(KEYS)

    const handleClick = (key) => {
      keyboard.notify(key)
    }

    return {
      keys,
      handleClick
    }
  }
}
</script>

<style scoped>
.pi-keyboard {
  display: grid;
  gap: .8rem;
  margin: 3.2rem auto 0;

  grid-template:
    "code7 code8 code9 backspace" 4rem
    "code4 code5 code6 enter" 4rem
    "code1 code2 code3 enter" 4rem
    "code0 code0 code0 enter" 4rem
    / 5.6rem 5.6rem 5.6rem 5.6rem;
}

.pi-keyboard__button {
  appearance: none;
  width: 100%;
  height: 100%;
  font-size: 2.4rem;
  font-weight: bold;
  color: var(--white-color);
  background-color: var(--light-gray-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pi-keyboard__button.-code-0 { grid-area: code0; }
.pi-keyboard__button.-code-1 { grid-area: code1; }
.pi-keyboard__button.-code-2 { grid-area: code2; }
.pi-keyboard__button.-code-3 { grid-area: code3; }
.pi-keyboard__button.-code-4 { grid-area: code4; }
.pi-keyboard__button.-code-5 { grid-area: code5; }
.pi-keyboard__button.-code-6 { grid-area: code6; }
.pi-keyboard__button.-code-7 { grid-area: code7; }
.pi-keyboard__button.-code-8 { grid-area: code8; }
.pi-keyboard__button.-code-9 { grid-area: code9; }
.pi-keyboard__button.-code-enter { grid-area: enter; }
.pi-keyboard__button.-code-backspace { grid-area: backspace; }

.pi-keyboard__button:active {
  background-color: var(--gray-color);
}

@media screen and (min-width: 786px) {
  .pi-keyboard {
    grid-template:
      "code7 code8 code9 backspace" 5.6rem
      "code4 code5 code6 enter" 5.6rem
      "code1 code2 code3 enter" 5.6rem
      "code0 code0 code0 enter" 5.6rem
      / 6.4rem 6.4rem 6.4rem 6.4rem;
  }

  .pi-keyboard__button {
    font-size: 3.2rem;
  }

  .pi-keyboard__button:hover {
    background-color: var(--gray-color);
  }
}
</style>
