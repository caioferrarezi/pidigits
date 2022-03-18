export const STATE_STORAGE_KEY = 'keyboard'

import { Storage } from '../services/storage'

class KeyboardRepository extends Storage {
  constructor() {
    super(STATE_STORAGE_KEY)
  }

  save(value) {
    super.set(value)
  }
}

export default Object.freeze(new KeyboardRepository())
