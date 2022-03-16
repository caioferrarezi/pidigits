<template>
  <div class="pi-input">
    <div
      v-for="pos in 5"
      :key="pos"
      type="text"
      :class="['pi-input__digit', classes[pos - 1]]"
    >
      {{ guess[pos - 1] }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    guess: Array,
    result: Array
  },
  setup(props) {
    const classes = computed(
      () => props.result.map(value => {
        switch(value) {
          case 0:
            return '-red'
          case 1:
            return '-yellow'
          case 2:
            return '-green'
          default:
            return ''
        }
      })
    )

    return {
      classes
    }
  }
}
</script>

<style scoped>
.pi-input {
  display: flex;
  gap: .8rem;
  width: 100%;
  margin: auto;
  justify-content: center;
}

.pi-input__digit {
  display: block;
  flex: 0 0 auto;
  width: 5.8rem;
  height: 5.8rem;
  line-height: 5.4rem;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  appearance: none;
  outline: none;
  color: var(--white-color);
  background-color: var(--gray-color);
  border: 3px solid var(--light-gray-color);
  border-radius: 4px;
}

.pi-input__digit.-green {
  background: var(--green-color);
  border-color: var(--green-color);
}

.pi-input__digit.-yellow {
  background: var(--yellow-color);
  border-color: var(--yellow-color);
}

.pi-input__digit.-red {
  background: var(--red-color);
  border-color: var(--red-color);
}

@media screen and (min-width: 786px) {
  .pi-input__digit {
    width: 6.4rem;
    height: 6.4rem;
    line-height: 6rem;
    font-size: 3.2rem;
  }
}
</style>
