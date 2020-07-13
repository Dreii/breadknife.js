import { Test } from '../types'

const setStoredTest = (rawData: Test[]): void => {
  const packagedData = JSON.stringify(rawData)
  window.localStorage.setItem('_BREADKNIFE_TESTS', packagedData)
}

export default setStoredTest
