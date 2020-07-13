import { Test } from '../types'
const getTestSlice = (config: Test, controlValue: string): string => {
  const splitKeys = Object.keys(config.split)
  if (splitKeys.length > 4) throw new Error('Breadknife does not support more than 4 slices in a test.')

  let min = 0
  let max = min

  const slices = splitKeys.map((slice, i) => {
    const split = config.split[slice]
    if (!split) throw new Error('Invalid split found in configuration')

    min = max + 1
    max += split * 100

    return {
      min,
      max,
      value: slice,
    }
  })

  let diceRoll = Math.round(Math.random() * 100)
  while (splitKeys.length === 3 && diceRoll === 100) diceRoll = Math.round(Math.random() * 100)
  const selectedSlice = slices.find(sliceSearch => diceRoll >= sliceSearch.min && diceRoll <= sliceSearch.max)
  return selectedSlice ? selectedSlice.value : controlValue
}

export default getTestSlice
