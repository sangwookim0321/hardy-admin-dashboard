import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function formatRoleDisplay(role: string): string {
  switch (role) {
    case 'super_admin':
      return 'Super Admin';
    case 'admin':
      return 'Admin';
    default:
      return 'Guest';
  }
}

/**
 * 날짜를 'YYYY.MM.DD' 형식으로 포맷팅
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: '2024.01.15')
 */
export function formatDate(date: Date | string): string {
  return dayjs(date).format('YYYY.MM.DD');
}

/**
 * 날짜를 'YYYY.MM.DD (요일)' 형식으로 포맷팅
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: '2024.01.15 (월)')
 */
export function formatDateWithDay(date: Date | string): string {
  return dayjs(date).format('YYYY.MM.DD (ddd)');
}

/**
 * 휴대폰 번호에 하이픈 추가
 * @param phone - 휴대폰 번호 문자열
 * @returns 하이픈이 추가된 휴대폰 번호 (예: '010-1234-5678')
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  
  return phone;
}

/**
 * 숫자에 천 단위 구분 콤마 추가
 * @param amount - 숫자 또는 숫자 문자열
 * @returns 콤마가 추가된 문자열 (예: '1,234,567')
 */
export function formatCurrency(amount: number | string): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount;
  return number.toLocaleString('ko-KR');
}