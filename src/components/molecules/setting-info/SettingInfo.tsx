import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { Button } from '@/components/atoms/button/Button'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { formatRoleDisplay, formatPhoneNumber, formatDate } from '@/utils/format'
import { useModalStore } from '@/store/ui-store/modal-store'
import { InfoEditModal } from './InfoEditModal'
import { useUser } from '@/hooks/useUser'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PasswordEditModal } from './PasswordEditModal'

export const SettingInfo = () => {
  const { user } = useAuthStore()
  const { openFormModal } = useModalStore()
  const { updateUserInfo, isUpdatingUserInfo, updateUserPassword, isUpdatingUserPassword } = useUser()

  const handleOpenInfoEditModal = () => {
    openFormModal({
      title: '사용자 정보 수정',
      content: (
        <InfoEditModal
          initialData={{
            email: user?.email || '',
            displayName: user?.display_name || '',
            phone: user?.phone || '',
          }}
          onSubmit={(data) => {
            updateUserInfo({
              targetUserId: user?.id || '',
              email: data.email,
              displayName: data.displayName,
              phone: data.phone,
            })
          }}
        />
      ),
      onConfirm: () => {
        const forms = document.getElementsByTagName('form')
        if (forms.length > 0) {
          const form = forms[0]
          const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true,
          })
          form.dispatchEvent(submitEvent)
        }
      },
    })
  }

  const handleOpenPasswordEditModal = () => {
    openFormModal({
      title: '비밀번호 변경',
      content: (
        <PasswordEditModal
          onSubmit={(data) => {
            updateUserPassword({
              targetUserId: user?.id || '',
              currentPassword: data.currentPassword,
              newPassword: data.newPassword,
              newPasswordConfirm: data.newPasswordConfirm,
              email: user?.email || '',
            })
          }}
        />
      ),
      onConfirm: () => {
        const forms = document.getElementsByTagName('form')
        if (forms.length > 0) {
          const form = forms[0]
          const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true,
          })
          form.dispatchEvent(submitEvent)
        }
      },
    })
  }

  if (!user) {
    return (
      <section className="bg-white rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_8px_-1px_rgba(0,0,0,0.2)] p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LoadingSkeleton />
        </div>
      </section>
    )
  }

  return (
    <section className="overflow-hidden bg-white rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_8px_-1px_rgba(0,0,0,0.2)] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <FlexBox direction="col" gap={8}>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">이메일</span>
            <Input disabled value={user.email || ''} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">닉네임</span>
            <Input disabled value={user.display_name || ''} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">휴대폰</span>
            <Input disabled value={formatPhoneNumber(user.phone) || ''} className="bg-gray-50" />
          </FlexBox>
        </FlexBox>
        <FlexBox direction="col" gap={8}>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">생성일</span>
            <Input disabled value={formatDate(user.created_at) || ''} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-20 text-gray-600">권한</span>
            <Input disabled value={formatRoleDisplay(user.user_role || '')} className="bg-gray-50" />
          </FlexBox>
          <FlexBox items="center" gap={4}>
            <span className="w-16 text-gray-600">수정</span>
            <FlexBox items="center" gap={4}>
              <Button
                variant="outline"
                size="md"
                className="h-10"
                onClick={handleOpenInfoEditModal}
                disabled={isUpdatingUserInfo}
              >
                {isUpdatingUserInfo ? '수정 중...' : '정보 수정'}
              </Button>
              <Button
                variant="outline"
                size="md"
                className="h-10"
                onClick={handleOpenPasswordEditModal}
                disabled={isUpdatingUserPassword}
              >
                {isUpdatingUserPassword ? '변경 중...' : '비밀번호 변경'}
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </div>
    </section>
  )
}

// 스켈레톤UI
const LoadingSkeleton = () => (
  <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
    <FlexBox direction="col" gap={8}>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">이메일</span>
        <Skeleton width={250} height={30} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">닉네임</span>
        <Skeleton width={250} height={30} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">휴대폰</span>
        <Skeleton width={250} height={30} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
    </FlexBox>
    <FlexBox direction="col" gap={8}>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">생성일</span>
        <Skeleton width={250} height={30} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">권한</span>
        <Skeleton width={250} height={30} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
      <FlexBox items="center" gap={4}>
        <span className="w-20 text-gray-600">수정</span>
        <Skeleton width={80} height={40} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </FlexBox>
    </FlexBox>
  </SkeletonTheme>
)
