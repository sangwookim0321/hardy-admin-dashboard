'use client';

import Sidebar from '@/components/organisms//sidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isValidating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isValidating && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isValidating, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-8 mt-[60px] lg:mt-0">{children}</main>
    </div>
  );
}
