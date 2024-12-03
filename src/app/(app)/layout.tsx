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
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
