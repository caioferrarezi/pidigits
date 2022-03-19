export const STATE_STORAGE_KEY = 'global'

import { Storage } from '../services/storage'

class GlobalRepository extends Storage {
  constructor() {
    super(STATE_STORAGE_KEY)
  }

  save(value = {}) {
    super.set({ ...super.state, ...value })
  }
}

export default Object.freeze(new GlobalRepository())
