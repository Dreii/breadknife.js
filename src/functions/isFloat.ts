export default function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0
}
