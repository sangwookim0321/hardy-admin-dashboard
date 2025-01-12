import { Card } from '@/components/atoms/card/Card'
import { Input } from '@/components/atoms/input/Input'
import { Textarea } from '@/components/atoms/textarea/Textarea'
import { ImageUploader } from '@/components/atoms/imageUploader/ImageUploader'

export interface SubjectiveTestBasicInfo {
  mainImage: string
  title: string
  subtitle: string
  description: string
  category: string
  tags: string
}

interface TestBasicInfoProps {
  info: SubjectiveTestBasicInfo
  onChange: (info: SubjectiveTestBasicInfo) => void
}

export function TestBasicInfo({ info, onChange }: TestBasicInfoProps) {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">테스트 기본 정보</h2>
      <div className="space-y-6">
        <ImageUploader
          image={info.mainImage}
          onImageChange={(image) => onChange({ ...info, mainImage: image })}
          label="메인 이미지를 등록해주세요."
        />

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">제목</p>
            <Input
              placeholder="테스트 제목을 입력하세요"
              value={info.title}
              onChange={(e) => onChange({ ...info, title: e.target.value })}
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">서브 제목</p>
            <Input
              placeholder="서브 제목을 입력하세요"
              value={info.subtitle}
              onChange={(e) => onChange({ ...info, subtitle: e.target.value })}
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">테스트 설명</p>
            <Textarea
              placeholder="테스트에 대한 설명을 입력하세요"
              value={info.description}
              onChange={(e) => onChange({ ...info, description: e.target.value })}
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">분류</p>
            <Input
              placeholder="분류를 입력하세요"
              value={info.category}
              onChange={(e) => onChange({ ...info, category: e.target.value })}
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">태그</p>
            <Input
              placeholder="태그를 입력하세요 (쉼표로 구분)"
              value={info.tags}
              onChange={(e) => onChange({ ...info, tags: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
