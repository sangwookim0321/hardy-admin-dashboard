export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  return cleaned
}
