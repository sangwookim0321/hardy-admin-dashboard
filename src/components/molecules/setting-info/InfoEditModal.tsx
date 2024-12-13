'use client'

import { Input } from '@/components/atoms/input/Input'
import { FlexBox } from '@/components/atoms/flex-box/FlexBox'
import { useState } from 'react'
import { formatPhoneNumber } from '@/utils/format'

interface InfoEditModalProps {
  initialData: {
    email: string
    raw_app_meta_data: {
      displayName: string
    }
    phone: string
  }
  onSubmit: (data: { email: string; displayName: string; phone: string }) => void
}

export const InfoEditModal = ({ initialData, onSubmit }: InfoEditModalProps) => {
  const [formData, setFormData] = useState({
    email: initialData.email,
    displayName: initialData.raw_app_meta_data.displayName,
    phone: formatPhoneNumber(initialData.phone) || '',
  })

  return (
    <FlexBox direction="col" gap={6} className="w-full">
      <FlexBox direction="col" gap={2} className="w-full pt-2">
        <label className="text-sm font-medium text-gray-700">이메일</label>
        <Input
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full"
          placeholder="이메일을 입력하세요"
        />
      </FlexBox>
      <FlexBox direction="col" gap={2} className="w-full pt-2">
        <label className="text-sm font-medium text-gray-700">닉네임</label>
        <Input
          value={formData.displayName}
          onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
          className="w-full"
          placeholder="닉네임을 입력하세요"
        />
      </FlexBox>
      <FlexBox direction="col" gap={2} className="w-full pt-2">
        <label className="text-sm font-medium text-gray-700">휴대폰</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="w-full"
          placeholder="휴대폰 번호를 입력하세요"
        />
      </FlexBox>
    </FlexBox>
  )
}
