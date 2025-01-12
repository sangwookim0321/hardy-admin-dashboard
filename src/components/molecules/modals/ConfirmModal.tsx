'use client'

import { Dialog } from '@/components/atoms/modal/Dialog'
import { Button } from '@/components/atoms/button/Button'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
}

export function ConfirmModal({ open, onClose, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onClose()
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} className="w-full max-w-md">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mt-2 text-gray-600">{message}</p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="red" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="sky" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
