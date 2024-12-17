'use client'
import { useAuthStore } from '@/store/auth-store/auth-store'
import { formatRoleDisplay } from '@/utils/format'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserProfile() {
  const { user } = useAuthStore()

  if (!user) {
    return <LoadingSkeleton />
  }

  return (
    <div className="flex flex-col items-center px-6 pb-6 border-b">
      <h2 className="text-lg font-semibold">{user?.display_name}</h2>
      <p className="text-sm text-gray-500">{formatRoleDisplay(user?.user_role)}</p>
    </div>
  )
}

// 스켈레톤Ui
const LoadingSkeleton = () => (
  <div className="flex flex-col items-center px-6 pb-6 border-b">
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <h2 className="text-lg font-semibold w-20">
        <Skeleton count={1} height={12} borderRadius={8} duration={0.8} enableAnimation direction="ltr" />
      </h2>
      <p className="text-sm text-gray-500 w-12">
        <Skeleton count={1} height={10} borderRadius={6} duration={0.8} enableAnimation direction="ltr" />
      </p>
    </SkeletonTheme>
  </div>
)
