import { StoreState } from '..'
import createStore from '..'

interface Modal {
  id: string
  isOpen: boolean
  title?: string
  content?: React.ReactNode
}

interface UIState extends StoreState {
  modals: Modal[]
  isLoading: boolean
}

interface UIActions {
  showModal: (modal: Omit<Modal, 'id' | 'isOpen'>) => void
  hideModal: (id: string) => void
  setLoading: (isLoading: boolean) => void
}

const initialState: UIState = {
  modals: [],
  isLoading: false,
}

export const useUIStore = createStore<UIState & UIActions>(
  {
    ...initialState,

    showModal: (modal) => {
      const id = Math.random().toString(36).substring(7)
      const newModal = { ...modal, id, isOpen: true }

      useUIStore.setState((state) => ({
        modals: [...state.modals, newModal],
      }))
    },

    hideModal: (id) => {
      useUIStore.setState((state) => ({
        modals: state.modals.map((modal) => (modal.id === id ? { ...modal, isOpen: false } : modal)),
      }))
    },

    setLoading: (isLoading) => useUIStore.setState({ isLoading }),
  },
  'ui-store'
)
