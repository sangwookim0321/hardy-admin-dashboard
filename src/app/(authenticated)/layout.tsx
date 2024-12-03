'use client';

import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isValidating } = useAuth();
  const router = useRouter();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!isValidating && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isValidating, router]);

  // 최초 마운트 시에는 무조건 렌더링
  // 그 이후에는 인증된 상태일 때만 렌더링
  if (!isFirstMount.current && !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
