import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export function formatRoleDisplay(role: string): string {
  switch (role) {
    case 'super_admin':
      return 'Super Admin'
    case 'admin':
      return 'Admin'
    case 'guest':
      return 'Guest'
    default:
      return 'Unknown'
  }
}

/**
 * 날짜를 'YYYY.MM.DD' 형식으로 포맷팅
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: '2024.01.15')
 */
export function formatDate(date: Date | string): string {
  return dayjs(date).format('YYYY. MM. DD')
}

/**
 * 날짜를 'YYYY.MM.DD (요일)' 형식으로 포맷팅
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: '2024.01.15 (월)')
 */
export function formatDateWithDay(date: Date | string): string {
  return dayjs(date).format('YYYY. MM. DD (ddd)')
}

/**
 * 휴대폰 번호에 하이픈 추가
 * @param phone - 휴대폰 번호 문자열
 * @returns 하이픈이 추가된 휴대폰 번호 (예: '010-1234-5678')
 */
export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return '-'

  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }

  return phone
}

/**
 * 숫자에 천 단위 구분 콤마 추가
 * @param amount - 숫자 또는 숫자 문자열
 * @returns 콤마가 추가된 문자열 (예: '1,234,567')
 */
export function formatCurrency(amount: number | string): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount
  return number.toLocaleString('ko-KR')
}

export function formatSuccessMessage(status: string): string {
  switch (status) {
    case 'Login Successful':
      return '로그인 성공!'
    case 'Logout Successful':
      return '로그아웃 성공!'
    case 'Refreshed Access Token':
      return '토큰이 갱신 되었습니다.'
    case 'Verified Successfully':
      return '인증 성공!'
    case 'Users Fetched Successfully':
      return '사용자 목록 조회 성공!'
    case 'Role Updated Successfully':
      return '해당 사용자의 역할이 변경되었습니다.'
    case 'User Deleted Successfully':
      return '사용자 삭제 완료.'
    case 'User Registered Successfully':
      return '새로운 유저를 생성했습니다.'
    case 'User Status Updated Successfully':
      return '사용자 상태 변경이 완료되었습니다.'
    case 'User Fetched Successfully':
      return '사용자 정보 조회 성공!'
    case 'User Updated Successfully':
      return '사용자 정보 변경이 완료되었습니다.'
    default:
      return status
  }
}

export function formatErrorMessage(status: string): string {
  switch (status) {
    case 'Internal Server Error':
      return '서버에 문제가 발생했습니다.'
    case 'Invalid login credentials':
      return '이메일 또는 패스워드가 일치하지 않습니다.'
    case 'Session Verification Failed':
      return '유효하지 않은 인증 토큰입니다.'
    case 'No Access Token Found':
      return '액세스 토큰이 없습니다.'
    case 'No Refresh Token Found':
      return '리프레시 토큰이 없습니다.'
    case 'Invalid Session':
      return '세션이 만료되었습니다. 다시 로그인해주세요.'
    case 'User Not Found':
      return '사용자를 찾을 수 없습니다.'
    case 'Failed to Update Role in Database.':
      return '역할 업데이트를 실패했습니다.'
    case 'Target User Not Found.':
      return '대상 사용자를 찾을 수 없습니다.'
    case 'Invalid Role Value.':
      return '역할 값이 잘못되었습니다.'
    case 'You Must Provide Both User ID and New Role.':
      return '사용자 ID와 역할 값이 필요합니다.'
    case 'You Do Not Have Permission.':
      return '권한이 없습니다.'
    case 'You Do Not Have Permission To Modify The Role Of The Project Owner.':
      return '프로젝트 소유자의 역할을 수정 할 수 없습니다.'
    case 'A user with this email address has already been registered':
      return '이메일 주소로 가입된 사용자가 있습니다.'
    case 'You Do Not Have Permission To Delete The Project Owner.':
      return '프로젝트 소유자를 삭제할 수 없습니다.'
    case 'You Must Provide User ID.':
      return '사용자 ID를 제공해야 합니다.'
    case 'You Must Provide Both Email and Password.':
      return '이메일과 패스워드를 제공해야 합니다.'
    case 'Database error deleting user':
      return 'RLS 정책에 의해 작업이 거부되었습니다.'
    case 'Invalid Email Format.':
      return '잘못된 이메일 형식입니다.'
    case 'Password must be at least 6 characters long and contain special characters, English letters, numbers, etc.':
      return '비밀번호는 특수문자, 영문, 숫자 포함 6자 이상이어야 합니다.'
    case 'You Must Provide Both User ID and New Status.':
      return '사용자 ID와 상태 값이 필요합니다.'
    case 'You Do Not Have Permission To Modify The Status Of The Project Owner.':
      return '프로젝트 소유자의 상태를 변경할 수 없습니다.'
    case 'You Must Provide New Status.':
      return '변경 할 상태값이 필요합니다.'
    case 'Invalid New Status.':
      return '변경할 상태값이 잘못되었습니다.'
    case 'User Is Not Active':
      return '해당 계정은 정지된 상태입니다.'
    case 'Too Many Requests':
      return '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.'
    case 'All Field Data Must Be Provided.':
      return '필드 데이터를 모두 제공해야합니다.'
    default:
      return status
  }
}
