'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdSettings, MdLogout } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import { signOut } from '@/lib/auth/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const projectMenus = [
  {
    label: 'Moco',
    href: '/projects/moco',
  },
  {
    label: 'Seraph Creator',
    href: '/projects/seraph',
  },
  {
    label: 'Portfolio',
    href: '/projects/portfolio',
  },
];

const bottomMenus = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: MdDashboard,
  },
  {
    label: '설정',
    href: '/settings',
    icon: MdSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('로그아웃 중 오류가 발생했습니다.');
      return;
    }
    toast.success('로그아웃 성공!');
    router.replace('/');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        {/* 로고 및 유저 정보 */}
        <div className="flex flex-col items-center p-6 border-b">
          <Image
            src="/hardy-admin-logo.svg"
            alt="Hardy Admin Logo"
            width={80}
            height={80}
            priority
          />
          <h2 className="mt-4 text-lg font-semibold">username</h2>
          <p className="text-sm text-gray-500">role</p>
        </div>

        {/* 프로젝트 메뉴 */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {projectMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm
                  ${pathname === menu.href
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <HiArrowRight className="h-4 w-4" />
                <span>{menu.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* 하단 메뉴 */}
        <div className="border-t p-4">
          <div className="space-y-2">
            {bottomMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm
                  ${pathname === menu.href
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <menu.icon className="h-5 w-5" />
                <span>{menu.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <MdLogout className="h-5 w-5" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
