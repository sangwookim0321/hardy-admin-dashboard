import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'

interface SettingInfoProps {
  email?: string
  displayName?: string
  phone?: string
  created_at?: string
  role?: string
}

export const SettingInfo = ({
  email,
  displayName,
  phone,
  created_at,
  role,
}: SettingInfoProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FlexBox direction="col" gap={4}>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">이메일</span>
            <Input disabled value={email} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">닉네임</span>
            <Input disabled value={displayName} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">휴대폰</span>
            <Input disabled value={phone} className="bg-gray-50" />
          </FlexBox>
        </FlexBox>
        <FlexBox direction="col" gap={4}>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">생성일</span>
            <Input disabled value={created_at} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">권한</span>
            <Input disabled value={role} className="bg-gray-50" />
          </FlexBox>
        </FlexBox>
      </div>
    </section>
  )
}
