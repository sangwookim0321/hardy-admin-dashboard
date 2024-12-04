'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'

interface SettingManagementProps {
  currentUser?: User | null
  users?: User[]
}

type Role = 'SUPER' | 'ADMIN' | 'GUEST'
type Status = '활성화' | '비활성화'

interface UserTableRow extends User {
  number: number
}

export const SettingManagement = ({ currentUser, users = [] }: SettingManagementProps) => {
  const isSuperAdmin = currentUser?.app_metadata?.role === 'super-admin'
  const [selectedRole, setSelectedRole] = useState<Role>('GUEST')
  const [selectedStatus, setSelectedStatus] = useState<Status>('활성화')

  const tableData: UserTableRow[] = users.map((user, index) => ({
    ...user,
    number: index + 1
  }))

  return (
    <div className="mt-8">
      <div className="overflow-x-auto bg-white rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_8px_-1px_rgba(0,0,0,0.2)] p-6">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">닉네임</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">휴대폰</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">생성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한</th>
              {isSuperAdmin && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한 변경</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.app_metadata?.displayName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.created_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.app_metadata?.role}</td>
                {isSuperAdmin && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                      >
                        <option value="SUPER">SUPER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="GUEST">GUEST</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status)}
                      >
                        <option value="활성화">활성화</option>
                        <option value="비활성화">비활성화</option>
                      </select>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}