import { useMutation, useQuery } from '@tanstack/react-query'
import { getUsersApi } from '@/lib/api/users-api/get-users-api/get-users-api'
import { updateRoleApi } from '@/lib/api/users-api/update-role-api/update-role-api'

type Role = 'super_admin' | 'admin' | 'guest'

export const useUser = () => {
  // 사용자 목록 조회 query
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersApi.getUsers(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분 동안은 리페치하지 않음
  })

  // 사용자 role 업데이트 mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ targetUserId, newRole }: { targetUserId: string; newRole: Role }) =>
      updateRoleApi.updateRole({ targetUserId, newRole }),
    onSuccess: (response) => {
      if (response.success) {
        usersQuery.refetch()
      }
    },
  })

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading || updateRoleMutation.isPending,
    isError: usersQuery.isError || updateRoleMutation.isError,
    error: usersQuery.error || updateRoleMutation.error,
    updateRole: updateRoleMutation.mutate,
    refetch: usersQuery.refetch,
  }
}