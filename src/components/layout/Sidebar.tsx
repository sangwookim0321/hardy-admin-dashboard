'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: '대시보드',
    href: '/dashboard',
    icon: '📊'  // 나중에 실제 아이콘으로 교체
  },
  {
    label: '설정',
    href: '/settings',
    icon: '⚙️'  // 나중에 실제 아이콘으로 교체
  },
  // 추후 메뉴 항목 추가
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-black text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">Hardy Admin</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors ${
                    pathname === item.href ? 'bg-gray-800' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
