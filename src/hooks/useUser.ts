import { useMutation, useQuery } from '@tanstack/react-query'
import { usersService } from '@/lib/api/users-api/users-service'

type Role = 'super_admin' | 'admin' | 'guest'

export const useUser = () => {
  // 사용자 목록 조회 query
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getUsers(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분 동안은 리페치하지 않음
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
  }
}
