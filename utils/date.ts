export function removeDay(date: string): string {
  const arr = date.split('/')
  arr.pop()
  return arr.join('-')
}
