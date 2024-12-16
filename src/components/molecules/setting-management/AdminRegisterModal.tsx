import { MdEmail, MdLock } from 'react-icons/md'
import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { useState, useRef, useEffect } from 'react'
import { Form } from '@/components/atoms/form/Form'
import { validateEmail, validatePassword } from '@/utils/validation'

interface AdminRegisterModalProps {
  onSubmit: (data: { email: string; password: string }) => void
}

export const AdminRegisterModal = ({ onSubmit }: AdminRegisterModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const formRef = useRef<HTMLFormElement>(null)

  // 이메일과 비밀번호 유효성 검사
  useEffect(() => {
    if (formData.email) {
      if (!validateEmail(formData.email)) {
        setErrors((prev) => ({ ...prev, email: '잘못된 이메일 형식입니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, email: '' }))
      }
    }
  }, [formData.email])

  useEffect(() => {
    if (formData.password) {
      if (!validatePassword(formData.password)) {
        setErrors((prev) => ({ ...prev, password: '비밀번호는 특수문자, 영문, 숫자 포함 6자 이상이어야 합니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, password: '' }))
      }
    }
  }, [formData.password])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current?.checkValidity() && !errors.email && !errors.password) {
      onSubmit(formData)
    } else {
      formRef.current?.reportValidity()
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
      <FlexBox direction="col" gap={6} className="w-full">
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">이메일</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full"
            placeholder="이메일을 입력하세요"
            icon={<MdEmail size={20} />}
            required
            error={errors.email}
            maxLength={50}
          />
        </FlexBox>
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">비밀번호</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full"
            placeholder="비밀번호를 입력하세요"
            icon={<MdLock size={20} />}
            required
            error={errors.password}
            maxLength={20}
          />
        </FlexBox>
      </FlexBox>
    </Form>
  )
}
