import createStore from '..'
import { AuthState } from './types'

const initialState: AuthState = {
  version: 1,
  user: null,
  accessToken: null,
  actions: {
    setAuth: () => {},
    clearAuth: () => {},
  },
}

export const useAuthStore = createStore<AuthState>(initialState, 'auth-storage')

// Initialize store actions
useAuthStore.setState((state) => ({
  ...state,
  actions: {
    setAuth: (user, accessToken) =>
      useAuthStore.setState({ user, accessToken }),
    clearAuth: () =>
      useAuthStore.setState({ user: null, accessToken: null }),
  },
}))
