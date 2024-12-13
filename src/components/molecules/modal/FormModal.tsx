'use client'

import { useModalStore } from '@/store/ui-store/modal-store'
import { BaseModal } from './BaseModal'

export const FormModal = () => {
  const { isFormModalOpen, formModalContent, closeFormModal } = useModalStore()

  if (!formModalContent) return null

  return (
    <BaseModal isOpen={isFormModalOpen} onClose={closeFormModal} className="w-[400px] max-w-lg p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{formModalContent.title}</h2>
          <button onClick={closeFormModal} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2">{formModalContent.content}</div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={closeFormModal} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            취소
          </button>
          <button
            onClick={() => {
              formModalContent.onConfirm()
              if (!formModalContent.onClose) {
                closeFormModal()
              }
            }}
            className="px-4 py-2 text-white bg-colorSky rounded-lg hover:bg-colorDarkSky"
          >
            확인
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
