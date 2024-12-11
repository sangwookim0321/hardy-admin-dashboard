'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { formatDate, formatPhoneNumber } from '@/utils/format'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from '@/components/atoms/button/Button'

interface UserDetail {
  id: string
  role: string
  email: string
  email_confirmed_at: string
  last_sign_in_at: string
  raw_app_meta_data: {
    role: string
    provider: string
    providers: string[]
    displayName: string
  }
  created_at: string
  updated_at: string
  phone: string | null
  confirmed_at: string
  service: string | null
  is_active: boolean
}

interface UserTableRow extends UserDetail {
  number: number
}

type Role = 'super_admin' | 'admin' | 'guest'
type Status = '활성화' | '비활성화'

export const SettingManagement = () => {
  const { users, isLoading, updateRole } = useUser()
  const { user: currentUser } = useAuthStore()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoading(false)
    }
  }, [isLoading])

  const handleRoleChange = async (userId: string, newRole: Role) => {
    updateRole({ targetUserId: userId, newRole })
  }

  const handleStatusChange = (userId: string, newStatus: Status) => {
    const isActive = newStatus === '활성화'
    // updateStatus({ targetUserId: userId, isActive })
  }

  const tableData: UserTableRow[] =
    users?.map((user, index) => ({
      ...user,
      number: index + 1,
      email_confirmed_at: user.email_confirmed_at,
      last_sign_in_at: user.last_sign_in_at,
      raw_app_meta_data: user.raw_app_meta_data,
      phone: user.phone,
      confirmed_at: user.confirmed_at,
      service: user.service,
      is_active: user.is_active,
    })) || []

  const LoadingSkeleton = () => (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={30} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={150} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={100} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={100} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={100} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={100} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton width={120} height={16} duration={0.8} enableAnimation direction="ltr" />
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={30} height={20} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={150} height={20} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={100} height={20} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={100} height={20} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={100} height={32} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={100} height={32} duration={0.8} enableAnimation direction="ltr" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Skeleton width={120} height={20} duration={0.8} enableAnimation direction="ltr" />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    </SkeletonTheme>
  )

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="md" className="border-colorSky bg-colorDarkSky text-white hover:bg-colorSky">
          관리자 등록
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {isInitialLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  {currentUser?.raw_app_meta_data?.role === 'super_admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.raw_app_meta_data?.displayName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPhoneNumber(user.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={user.raw_app_meta_data?.role || 'guest'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        disabled={currentUser?.raw_app_meta_data?.role !== 'super_admin'}
                        className="rounded border p-2 focus:border-colorSky focus:outline-none"
                      >
                        {user.id === currentUser?.id && user.raw_app_meta_data?.role === 'super_admin' ? (
                          <option value="super_admin">Super Admin</option>
                        ) : (
                          <>
                            <option value="guest">Guest</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={user.is_active ? '활성화' : '비활성화'}
                        onChange={(e) => handleStatusChange(user.id, e.target.value as Status)}
                        disabled={currentUser?.raw_app_meta_data?.role !== 'super_admin'}
                        className="rounded border p-2 focus:border-colorSky focus:outline-none"
                      >
                        <option value="활성화">활성화</option>
                        <option value="비활성화">비활성화</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(user.created_at)}</td>
                    {currentUser?.raw_app_meta_data?.role === 'super_admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Button
                          variant="outline"
                          size="md"
                          className="border-red-500 bg-red-500 text-white hover:bg-red-600"
                        >
                          삭제
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  )
}
