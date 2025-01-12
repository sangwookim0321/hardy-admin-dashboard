import { Button } from '@/components/atoms/button/Button'

interface ActionButtonsProps {
  onReset: () => void
  onSave: () => void
}

export function ActionButtons({ onReset, onSave }: ActionButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t pt-4 pb-4 pl-4 pr-8 ml-0 lg:ml-64 flex justify-end gap-4">
      <Button variant="red" className="w-32" onClick={onReset}>
        취소하기
      </Button>
      <Button className="w-32" onClick={onSave}>
        저장하기
      </Button>
    </div>
  )
}
