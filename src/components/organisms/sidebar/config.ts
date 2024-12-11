import { MdDashboard, MdSettings, MdLogout } from 'react-icons/md';

export const projectMenus = [
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

export const bottomMenus = [
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
