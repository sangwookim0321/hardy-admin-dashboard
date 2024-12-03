'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdSettings, MdLogout } from 'react-icons/md';
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { signOut } from '@/lib/auth/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const projectMenus = [
  {
    label: 'Moco',
    href: '/moco',
    children: [
      {
        label: '능력 테스트',
        href: '/moco/ability-test',
      },
      {
        label: '주관식 테스트',
        href: '/moco/subjective-test',
      },
      {
        label: '유형 테스트',
        href: '/moco/type-test',
      },
    ],
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
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('로그아웃 중 오류가 발생했습니다.');
      return;
    }
    toast.success('로그아웃 성공!');
    router.replace('/');
  };

  const toggleMenu = (href: string) => {
    setOpenMenus(prev => 
      prev.includes(href) 
        ? prev.filter(menu => menu !== href)
        : [...prev, href]
    );
  };

  return (
    <>
      {/* 모바일 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Image
            src="/hardy-admin-logo.svg"
            alt="Hardy Admin Logo"
            width={40}
            height={40}
            priority
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* 모바일 메뉴 */}
        <div
          className={`
            fixed left-0 right-0 bg-white transition-all duration-300 ease-in-out overflow-hidden origin-top
            ${isOpen 
              ? 'top-[60px] bottom-0 opacity-100 pointer-events-auto visible scale-y-100' 
              : 'top-[60px] bottom-0 opacity-0 pointer-events-none invisible scale-y-0'
            }
          `}
        >
          <div className="flex flex-col h-full">
            {/* 스크롤 가능한 메인 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto">
              {/* 유저 정보 */}
              <div className="flex flex-col items-center p-6 border-b">
                <h2 className="text-lg font-semibold">{user?.app_metadata?.displayName}</h2>
                <p className="text-sm text-gray-500">{user?.app_metadata?.role === 'super-admin' ? 'Super Admin' : user?.app_metadata?.role === 'admin' ? 'Admin' : 'Guest'}</p>
              </div>

              {/* 프로젝트 메뉴 */}
              <nav className="p-4">
                <div className="space-y-2">
                  {projectMenus.map((menu) => (
                    <div key={menu.href}>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (menu.children) {
                            toggleMenu(menu.href);
                          } else {
                            router.push(menu.href);
                            setIsOpen(false);
                          }
                        }}
                        className={`
                          flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm cursor-pointer
                          ${pathname === menu.href || openMenus.includes(menu.href)
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <HiChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ease-in-out
                            ${openMenus.includes(menu.href) ? 'rotate-180' : ''}
                          `}
                        />
                        <span>{menu.label}</span>
                      </div>
                      {menu.children && (
                        <div 
                          className={`
                            ml-7 space-y-1 overflow-hidden transition-all duration-200 ease-in-out
                            ${openMenus.includes(menu.href) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                          `}
                        >
                          {menu.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`
                                block rounded-lg px-4 py-2 text-sm
                                ${pathname === child.href
                                  ? 'text-colorSky font-bold'
                                  : 'text-gray-600 hover:text-colorSky hover:font-bold'
                                }
                              `}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            </div>

            {/* 하단 메뉴 - 최하단 고정 */}
            <div className="border-t p-4 bg-white">
              <div className="space-y-2">
                {bottomMenus.map((menu) => (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm
                      ${pathname === menu.href
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <menu.icon className="h-4 w-4" />
                    <span>{menu.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdLogout className="h-4 w-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 데스크톱 사이드바 */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-lg hidden lg:block">
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
            <h2 className="mt-4 text-lg font-semibold">{user?.app_metadata?.displayName || 'User'}</h2>
            <p className="text-sm text-gray-500">{user?.app_metadata?.role === 'super-admin' ? 'Super Admin' : user?.app_metadata?.role === 'admin' ? 'Admin' : 'Guest'}</p>
          </div>

          {/* 프로젝트 메뉴 */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {projectMenus.map((menu) => (
                <div key={menu.href}>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      if (menu.children) {
                        toggleMenu(menu.href);
                      } else {
                        router.push(menu.href);
                      }
                    }}
                    className={`
                      flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm cursor-pointer
                      ${pathname === menu.href || openMenus.includes(menu.href)
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <HiChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ease-in-out
                        ${openMenus.includes(menu.href) ? 'rotate-180' : ''}
                      `}
                    />
                    <span>{menu.label}</span>
                  </div>
                  {menu.children && (
                    <div 
                      className={`
                        ml-7 space-y-1 overflow-hidden transition-all duration-200 ease-in-out
                        ${openMenus.includes(menu.href) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      {menu.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`
                            block rounded-lg px-4 py-2 text-sm
                            ${pathname === child.href
                              ? 'text-colorSky font-bold'
                              : 'text-gray-600 hover:text-colorSky hover:font-bold'
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
                  <menu.icon className="h-4 w-4" />
                  <span>{menu.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                <MdLogout className="h-4 w-4" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
