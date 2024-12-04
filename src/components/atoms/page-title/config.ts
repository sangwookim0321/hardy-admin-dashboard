export const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard'
    case '/settings':
      return '설정'
    case '/moco/ability-test':
      return 'Moco 능력 테스트'
    case '/moco/subjective-test':
      return 'Moco 주관식 테스트'
    case '/moco/type-test':
      return 'Moco 유형 테스트'
    default:
      return ''
  }
}
