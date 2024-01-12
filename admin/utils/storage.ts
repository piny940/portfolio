export const toStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const fromStorage = (key: string) => {
  return localStorage.getItem(key)
}
