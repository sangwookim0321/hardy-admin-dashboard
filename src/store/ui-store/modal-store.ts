import { create } from 'zustand';

interface FormModalContent {
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onClose?: () => void;
}

interface ConfirmModalContent {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ModalState {
  isFormModalOpen: boolean;
  isConfirmModalOpen: boolean;
  formModalContent: FormModalContent | null;
  confirmModalContent: ConfirmModalContent | null;
  openFormModal: (content: FormModalContent) => void;
  closeFormModal: () => void;
  openConfirmModal: (content: ConfirmModalContent) => void;
  closeConfirmModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isFormModalOpen: false,
  isConfirmModalOpen: false,
  formModalContent: null,
  confirmModalContent: null,
  
  openFormModal: (content) => set({ 
    isFormModalOpen: true, 
    formModalContent: content 
  }),
  
  closeFormModal: () => set({ 
    isFormModalOpen: false, 
    formModalContent: null 
  }),
  
  openConfirmModal: (content) => set({ 
    isConfirmModalOpen: true, 
    confirmModalContent: content 
  }),
  
  closeConfirmModal: () => set({ 
    isConfirmModalOpen: false, 
    confirmModalContent: null 
  }),
}));
