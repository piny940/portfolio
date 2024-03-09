const KEY = 'TWPxFXpE2RFP72P'

export const toStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY + key, value)
}

export const fromStorage = (key: string) => {
  if (typeof window === 'undefined') return
  return localStorage.getItem(KEY + key)
}

export const toCookie = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  document.cookie = `${key}=${value};path=/`
}
