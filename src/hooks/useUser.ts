import { useMutation, useQuery } from '@tanstack/react-query'
import { usersService } from '@/lib/api/users-api/users-service'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Role = 'super_admin' | 'admin' | 'guest'

export const useUser = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()

  // 사용자 목록 조회 query
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getUsers(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분 동안은 리페치하지 않음
  })

  // 사용자 정보 조회 query
  const userInfoQuery = useQuery({
    queryKey: ['user-info'],
    queryFn: () => usersService.getUserInfo({ targetUserId: '' }),
    select: (response) => response.data,
    enabled: false, // 자동 실행 비활성화
  })

  // 사용자 role 업데이트 mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ targetUserId, newRole }: { targetUserId: string; newRole: Role }) =>
      usersService.updateRole({ targetUserId, newRole }),
    onSuccess: (response) => {
      if (response.success) {
        usersQuery.refetch()
      }
    },
  })

  // 사용자 등록 mutation
  const registerMutation = useMutation({
    mutationFn: (params: { email: string; password: string }) => usersService.register(params),
    onSuccess: (response) => {
      if (response.success) {
        usersQuery.refetch()
      }
    },
  })

  // 사용자 삭제 mutation
  const deleteUserMutation = useMutation({
    mutationFn: (params: { targetUserId: string }) => usersService.deleteUser(params),
    onSuccess: (response) => {
      if (response.success) {
        usersQuery.refetch()
      }
    },
  })

  // 사용자 상태 변경 mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ targetUserId, newStatus }: { targetUserId: string; newStatus: string }) =>
      usersService.updateStatus({ targetUserId, newStatus }),
    onSuccess: (response) => {
      if (response.success) {
        usersQuery.refetch()
      }
    },
  })

  // 사용자 정보 변경 mutation
  const updateUserInfoMutation = useMutation({
    mutationFn: ({
      targetUserId,
      email,
      displayName,
      phone,
    }: {
      targetUserId: string
      email: string
      displayName: string
      phone: string
    }) => usersService.updateUserInfo({ targetUserId, email, displayName, phone }),
    onSuccess: async (response, variables) => {
      if (response.success) {
        const result = await usersService.getUserInfo({ targetUserId: variables.targetUserId })
        if (result.success && result.data) {
          setUser(result.data)
        }
        await usersQuery.refetch()
      }
    },
  })

  // 사용자 비밀번호 변경 mutation
  const updateUserPasswordMutation = useMutation({
    mutationFn: ({
      targetUserId,
      currentPassword,
      newPassword,
      newPasswordConfirm,
      email,
    }: {
      targetUserId: string
      currentPassword: string
      newPassword: string
      newPasswordConfirm: string
      email: string
    }) => usersService.updateUserPassword({ targetUserId, currentPassword, newPassword, newPasswordConfirm, email }),
    onSuccess: (response) => {
      if (response.success) {
        router.replace('/')
      }
    },
  })

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    updateRole: updateRoleMutation.mutate,
    isUpdatingRole: updateRoleMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeletingUser: deleteUserMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateUserInfo: updateUserInfoMutation.mutate,
    isUpdatingUserInfo: updateUserInfoMutation.isPending,
    userInfo: userInfoQuery.data,
    isLoadingUserInfo: userInfoQuery.isLoading,
    updateUserPassword: updateUserPasswordMutation.mutate,
    isUpdatingUserPassword: updateUserPasswordMutation.isPending,
  }
}
