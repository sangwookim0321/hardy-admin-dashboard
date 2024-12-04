'use client';

import Sidebar from '@/components/organisms/sidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PageTitle } from '@/components/atoms/page-title/PageTitle';
import { getPageTitle } from '@/components/atoms/page-title/config';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isValidating } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isValidating && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isValidating, router]);

  if (!isAuthenticated) {
    return null;
  }

  const title = getPageTitle(pathname);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-8 mt-[60px] lg:mt-0">
        {title && <PageTitle title={title} />}
        {children}
      </main>
    </div>
  );
}
