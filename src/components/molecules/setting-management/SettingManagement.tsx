'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { formatDate, formatPhoneNumber } from '@/utils/format'
import { Button } from '@/components/atoms/button/Button'
import { useModalStore } from '@/store/ui-store/modal-store'
import { AdminRegisterModal } from './AdminRegisterModal'
import { ClipLoader } from 'react-spinners'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface UserDetail {
  id: string
  role: string
  display_name: string
  user_role: string
  email: string
  email_confirmed_at: string
  last_sign_in_at: string
  raw_app_meta_data?: {
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
  const {
    users,
    isLoading,
    updateRole,
    isUpdatingRole,
    register,
    isRegistering,
    deleteUser,
    isDeletingUser,
    updateStatus,
    isUpdatingStatus,
  } = useUser()
  const { user: currentUser } = useAuthStore()
  const { openFormModal, openConfirmModal } = useModalStore()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [updatingRoleIndex, setUpdatingRoleIndex] = useState<number | null>(null)
  const [updatingStatusIndex, setUpdatingStatusIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoading(false)
    }
  }, [isLoading])

  const handleRoleChange = async (userId: string, newRole: Role, index: number) => {
    if (isUpdatingRole) return

    setUpdatingRoleIndex(index)
    updateRole({ targetUserId: userId, newRole })
  }

  const handleStatusChange = async (userId: string, newStatus: Status, index: number) => {
    if (isUpdatingStatus) return

    setUpdatingStatusIndex(index)
    updateStatus({ targetUserId: userId, newStatus })
  }

  const handleOpenRegisterModal = () => {
    openFormModal({
      title: '관리자 등록',
      content: (
        <AdminRegisterModal
          onSubmit={(data) => {
            register(data)
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

  const handleOpenConfirmModal = (userId: string, userName: string, userEmail: string) => {
    openConfirmModal({
      title: '계정 삭제',
      message: `정말로 ${userName} (${userEmail}) 계정을 삭제하시겠습니까?`,
      onConfirm: () => {
        console.log('Delete user:', userId)
        deleteUser({ targetUserId: userId })
      },
    })
  }

  const tableData: UserTableRow[] =
    users?.map((user, index) => ({
      ...user,
      number: index + 1,
      email_confirmed_at: user.email_confirmed_at,
      last_sign_in_at: user.last_sign_in_at,
      display_name: user.display_name,
      user_role: user.user_role,
      created_at: formatDate(user.created_at),
      updated_at: formatDate(user.updated_at),
      phone: user.phone,
      confirmed_at: user.confirmed_at,
      service: user.service,
      is_active: user.is_active,
    })) || []

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant={currentUser?.user_role === 'super_admin' ? 'sky' : 'secondary'}
          size="md"
          onClick={handleOpenRegisterModal}
          disabled={currentUser?.user_role !== 'super_admin'}
        >
          관리자 등록
        </Button>
      </div>
      <div className="overflow-x-scroll">
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
                  {currentUser?.user_role === 'super_admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.display_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPhoneNumber(user.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center relative w-[150px]">
                        <select
                          value={user.user_role || 'guest'}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as Role, index)}
                          disabled={currentUser?.user_role !== 'super_admin'}
                          className="w-full rounded border p-2 focus:border-colorSky focus:outline-none"
                        >
                          {user.id === currentUser?.id && user.user_role === 'super_admin' ? (
                            <option value="super_admin">Super Admin</option>
                          ) : (
                            <>
                              <option value="guest">Guest</option>
                              <option value="admin">Admin</option>
                              <option value="super_admin">Super Admin</option>
                            </>
                          )}
                        </select>
                        <div className="absolute right-[-24px]">
                          <ClipLoader
                            color="#3E80D5"
                            loading={updatingRoleIndex === index && isUpdatingRole}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center relative w-[150px]">
                        <select
                          value={user.is_active ? '활성화' : '비활성화'}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as Status, index)}
                          disabled={currentUser?.user_role !== 'super_admin'}
                          className="rounded border p-2 focus:border-colorSky focus:outline-none"
                        >
                          <option value="활성화">활성화</option>
                          <option value="비활성화">비활성화</option>
                        </select>
                        <div className="absolute right-[36px]">
                          <ClipLoader
                            color="#3E80D5"
                            loading={updatingStatusIndex === index && isUpdatingStatus}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(user.created_at)}</td>
                    {currentUser?.user_role === 'super_admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Button
                          variant="red"
                          size="md"
                          onClick={() => handleOpenConfirmModal(user.id, user.display_name, user.email)}
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

// 스켈레톤Ui
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
