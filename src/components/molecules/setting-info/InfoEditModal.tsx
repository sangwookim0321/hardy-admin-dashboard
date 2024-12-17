'use client'

import { MdEmail, MdPhone, MdPerson } from 'react-icons/md'
import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { Form } from '@/components/atoms/form/Form'
import { useState, useRef, useEffect } from 'react'
import { formatPhoneNumber } from '@/utils/format'
import { validateEmail, validateName, validatePhone } from '@/utils/validation'

interface InfoEditModalProps {
  initialData: {
    email: string
    displayName: string
    phone: string
  }
  onSubmit: (data: { email: string; displayName: string; phone: string }) => void
}

export const InfoEditModal = ({ initialData, onSubmit }: InfoEditModalProps) => {
  const [formData, setFormData] = useState({
    email: initialData.email,
    displayName: initialData.displayName,
    phone: formatPhoneNumber(initialData.phone) || '',
  })
  const [errors, setErrors] = useState({
    email: '',
    displayName: '',
    phone: '',
  })
  const formRef = useRef<HTMLFormElement>(null)

  // 이메일, 닉네임, 휴대폰 유효성 검사
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
    if (formData.displayName) {
      if (!validateName(formData.displayName)) {
        setErrors((prev) => ({ ...prev, displayName: '잘못된 닉네임 형식입니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, displayName: '' }))
      }
    }
  }, [formData.displayName])

  useEffect(() => {
    if (formData.phone) {
      if (!validatePhone(formData.phone)) {
        setErrors((prev) => ({ ...prev, phone: '잘못된 휴대폰 형식입니다.' }))
      } else {
        setErrors((prev) => ({ ...prev, phone: '' }))
      }
    }
  }, [formData.phone])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current?.checkValidity() && !errors.email && !errors.displayName && !errors.phone) {
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
            required
            error={errors.email}
            maxLength={50}
            icon={<MdEmail size={20} />}
          />
        </FlexBox>
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">닉네임</label>
          <Input
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
            className="w-full"
            placeholder="닉네임을 입력하세요"
            required
            error={errors.displayName}
            maxLength={10}
            icon={<MdPerson size={20} />}
          />
        </FlexBox>
        <FlexBox direction="col" gap={2} className="w-full pt-2">
          <label className="text-sm font-medium text-gray-700">휴대폰 번호</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              const phoneNumber = e.target.value.replace(/[^0-9]/g, '')
              const formattedNumber = formatPhoneNumber(phoneNumber)
              setFormData((prev) => ({ ...prev, phone: formattedNumber }))
            }}
            className="w-full"
            placeholder="휴대폰 번호를 입력하세요"
            required
            error={errors.phone}
            maxLength={13}
            icon={<MdPhone size={20} />}
          />
        </FlexBox>
      </FlexBox>
    </Form>
  )
}
