export const calculatePasswordStrength = (password: string): number => {
  let strength = 0
  if (password.length >= 8) strength += 1
  if (password.match(/[a-z]+/)) strength += 1
  if (password.match(/[A-Z]+/)) strength += 1
  if (password.match(/[0-9]+/)) strength += 1
  if (password.match(/[$@#&!]+/)) strength += 1
  return strength
}

export const getPasswordStrengthLabel = (strength: number): string => {
  switch (strength) {
    case 0:
    case 1:
      return "Çok Zayıf"
    case 2:
      return "Zayıf"
    case 3:
      return "Orta"
    case 4:
      return "Güçlü"
    case 5:
      return "Çok Güçlü"
    default:
      return "Geçersiz"
  }
}

