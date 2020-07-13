import { Test } from '../types'
const getStoredTests = (): Test[] => {
  const rawData: string = window.localStorage.getItem('_BREADKNIFE_TESTS') || '[]'
  let parsed = []
  try {
    parsed = JSON.parse(rawData)
  } catch (err) {
    console.log('Invalid test storage')
  }

  return parsed
}

export default getStoredTests
