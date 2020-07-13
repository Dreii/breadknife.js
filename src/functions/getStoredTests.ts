import { Test } from '../types'
const getStoredTests = (): Test[] => {
  const rawData: string = window.localStorage.getItem('_BREADKNIFE_TESTS') || '[]'
  let parsed = []
  try {
    parsed = JSON.parse(rawData)
    // tslint:disable-next-line
  } catch (err) {
    // tslint:disable-next-line
    console.warn('Invalid test storage')
  }

  return parsed
}

export default getStoredTests
