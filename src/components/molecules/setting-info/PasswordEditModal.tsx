'use client'

import { MdLock, MdKey, MdCheck } from 'react-icons/md'
import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { Form } from '@/components/atoms/form/Form'
import { useState, useRef, useEffect } from 'react'
import { validatePassword } from '@/utils/validation'

interface PasswordEditModalProps {
  onSubmit: (data: { currentPassword: string; newPassword: string; newPasswordConfirm: string }) => void
}

export const PasswordEditModal = ({ onSubmit }: PasswordEditModalProps) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formData.newPassword) {
      if (!validatePassword(formData.newPassword)) {
        setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 특수문자, 영문, 숫자 포함 6자 이상이어야 합니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, newPassword: '' }))
      }
    }
  }, [formData.newPassword])

  useEffect(() => {
    if (formData.newPasswordConfirm !== formData.newPassword) {
      setErrors((prev) => ({ ...prev, newPasswordConfirm: '비밀번호가 일치하지 않습니다.' }))
    } else {
      setErrors((prev) => ({ ...prev, newPasswordConfirm: '' }))
    }
  }, [formData.newPasswordConfirm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formRef.current?.checkValidity() &&
      !errors.currentPassword &&
      !errors.newPassword &&
      !errors.newPasswordConfirm
    ) {
      onSubmit(formData)
    } else {
      formRef.current?.reportValidity()
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
      <FlexBox direction="col" gap={6} className="w-full">
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">현재 비밀번호</label>
          <Input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))}
            className="w-full"
            placeholder="현재 비밀번호를 입력해주세요."
            required
            error={errors.currentPassword}
            maxLength={50}
            icon={<MdLock size={20} />}
          />
        </FlexBox>
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">새로운 비밀번호</label>
          <Input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
            className="w-full"
            placeholder="새로운 비밀번호를 입력해주세요."
            required
            error={errors.newPassword}
            maxLength={10}
            icon={<MdKey size={20} />}
          />
        </FlexBox>
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">새로운 비밀번호 확인</label>
          <Input
            type="password"
            value={formData.newPasswordConfirm}
            onChange={(e) => setFormData((prev) => ({ ...prev, newPasswordConfirm: e.target.value }))}
            className="w-full"
            placeholder="새로운 비밀번호를 확인해주세요."
            required
            error={errors.newPasswordConfirm}
            maxLength={13}
            icon={<MdCheck size={20} />}
          />
        </FlexBox>
      </FlexBox>
    </Form>
  )
}
