export const STATE_STORAGE_KEY = 'state'

import { Storage } from '../services/storage'

class GameRepository extends Storage {
  constructor() {
    super(STATE_STORAGE_KEY)
  }

  save(value = {}) {
    super.set({ ...super.state, ...value })
  }
}

export default Object.freeze(new GameRepository())
