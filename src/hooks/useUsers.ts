import { useEffect, useState } from 'react'
import { useApi } from './useApi'
import toast from 'react-hot-toast'
import { User } from '@supabase/supabase-js'

export interface UserWithMetadata extends User {
  app_metadata: {
    role: 'super' | 'admin' | 'guest'
    displayName: string
  }
  user_metadata: {
    [key: string]: any
  }
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserWithMetadata[]>([])
  const [loading, setLoading] = useState(false)
  
  const { execute: fetchUsers } = useApi<{ users: UserWithMetadata[] }>('/api/users')

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const response = await fetchUsers()
        setUsers(response.users)
      } catch (error) {
        toast.error('사용자 목록을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [fetchUsers])

  return { users, loading }
}
