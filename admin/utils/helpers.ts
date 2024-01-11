export const dateLabel = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${digit(d.getMonth() + 1, 2)}-${digit(
    d.getDate(),
    2
  )} ${digit(d.getHours(), 2)}:${digit(d.getMinutes(), 2)}`
}

export const digit = (num: number, digit: number) => {
  const pre = '0'.repeat(digit)
  return (pre + num).slice(-digit)
}
