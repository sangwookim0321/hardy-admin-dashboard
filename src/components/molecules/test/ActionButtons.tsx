'use client'

import { Button } from '@/components/atoms/button/Button'
import { ConfirmModal } from '@/components/molecules/modals/ConfirmModal'
import { useState } from 'react'

interface ActionButtonsProps {
  onReset: () => void
  onSave: () => void
}

export function ActionButtons({ onReset, onSave }: ActionButtonsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t ml-0 lg:ml-64 px-4 lg:px-8 py-4 lg:py-6">
        <div className="flex justify-end gap-2">
          <Button variant="red" onClick={() => setIsConfirmOpen(true)}>
            취소하기
          </Button>
          <Button variant="sky" onClick={onSave}>
            저장하기
          </Button>
        </div>
      </div>

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="작성 취소"
        message="작성 중인 내용이 모두 초기화됩니다. 계속하시겠습니까?"
        onConfirm={onReset}
      />
    </>
  )
}
