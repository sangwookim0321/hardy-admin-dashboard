export const validateEmail = (email: string) => {
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return emailRegex.test(email)
}

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
  return passwordRegex.test(password)
}

export const validateName = (name: string) => {
  const nameRegex = /^[a-zA-Z0-9\u3131-\u3163\uac00-\ud7a3]{1,10}$/
  return nameRegex.test(name)
}

export const validatePhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '')
  const phoneRegex = /^\d{10,11}$/
  return phoneRegex.test(cleaned)
}
