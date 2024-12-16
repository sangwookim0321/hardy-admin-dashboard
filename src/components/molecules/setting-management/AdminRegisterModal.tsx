'use client'

import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { useState, useRef } from 'react'
import { Form } from '@/components/atoms/form/Form'

interface AdminRegisterModalProps {
  onSubmit: (data: { email: string; password: string }) => void
}

export const AdminRegisterModal = ({ onSubmit }: AdminRegisterModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
          />
        </FlexBox>
      </FlexBox>
    </Form>
  )
}
