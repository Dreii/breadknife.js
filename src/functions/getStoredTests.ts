import { Test } from '../types'
const getStoredTests = (): Test[] => {
  const rawData: string = window.localStorage.getItem('_BREADKNIFE_TESTS') || '[]'
  return JSON.parse(rawData)
}

export default getStoredTests
