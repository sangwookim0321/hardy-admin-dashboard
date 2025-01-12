export const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard'
    case '/settings':
      return '설정'
    case '/moco/ability-test':
      return '모코 플레이 | 능력고사 테스트'
    case '/moco/subjective-test':
      return '모코 플레이 | 주관식 테스트'
    case '/moco/type-test':
      return '모코 플레이 | 유형 테스트'
    default:
      return ''
  }
}
