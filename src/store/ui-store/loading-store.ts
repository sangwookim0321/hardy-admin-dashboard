import { StoreState } from '..'
import createStore from '..'

interface LoadingState extends StoreState {
  isLoading: boolean
}

interface LoadingActions {
  setLoading: (isLoading: boolean) => void
}

const initialState: LoadingState = {
  isLoading: false,
}

export const useLoadingStore = createStore<LoadingState & LoadingActions>(
  {
    ...initialState,
    setLoading: (isLoading) => useLoadingStore.setState({ isLoading }),
  },
  'loading-store'
)
