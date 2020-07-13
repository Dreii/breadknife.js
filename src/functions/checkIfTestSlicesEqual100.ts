import { Test } from '../types'
import { isFloat } from './'
const checkIfTestSlicesEqual100 = (config: Test) => {
  const versions = Object.keys(config.split)

  let totalPercent = 0
  versions.forEach(version => {
    const versionPercentage = config.split[version]
    if (versionPercentage === undefined || !isFloat(versionPercentage)) {
      throw new Error('Invalid Version supplied in config.')
    }
    (totalPercent += versionPercentage)
  })
  if (totalPercent < 0.99 || totalPercent > 1)
    throw new Error('Test Split Total is not 100% please ensure all slices added together equals 1')
}

export default checkIfTestSlicesEqual100


