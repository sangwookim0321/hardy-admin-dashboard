import { MdDashboard, MdSettings, MdLogout } from 'react-icons/md'

export const projectMenus = [
  {
    label: '모코 플레이',
    href: '/moco',
    children: [
      {
        label: '능력고사 테스트',
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
    href: '/seraph-creator',
    children: [
      {
        label: '데이터 등록',
        href: '/seraph-creator/registration',
      },
      {
        label: '데이터 목록',
        href: '/seraph-creator/list',
      },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      {
        label: '데이터 등록',
        href: '/portfolio/registration',
      },
      {
        label: '데이터 목록',
        href: '/portfolio/list',
      },
    ],
  },
]

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
]
