'use client';

import { useAuth } from '@/hooks/useAuth';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <>
      <MobileSidebar user={user} />
      <DesktopSidebar user={user} />
    </>
  );
}