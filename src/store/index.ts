import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoreState {
  version: number
}

const createStore = <T extends StoreState>(
  initialState: T,
  storeName: string
) => {
  return create<T>()(
    persist(
      (set) => ({
        ...initialState,
        set,
      }),
      {
        name: storeName,
      }
    )
  )
}

export default createStore
