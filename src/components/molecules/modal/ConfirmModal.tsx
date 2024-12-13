'use client'

import { useModalStore } from '@/store/ui-store/modal-store'
import { BaseModal } from './BaseModal'

export const ConfirmModal = () => {
  const { isConfirmModalOpen, confirmModalContent, closeConfirmModal } = useModalStore()

  if (!confirmModalContent) return null

  return (
    <BaseModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} className="w-full max-w-md p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{confirmModalContent.title}</h2>
          <button onClick={closeConfirmModal} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-gray-600">{confirmModalContent.message}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              if (confirmModalContent.onCancel) {
                confirmModalContent.onCancel()
              }
              closeConfirmModal()
            }}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={() => {
              confirmModalContent.onConfirm()
              closeConfirmModal()
            }}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            확인
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
