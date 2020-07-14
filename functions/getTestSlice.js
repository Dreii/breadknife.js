const isFloat = require('./isFloat')

module.exports = getTestSlice = (config, controlValue) => {
  const splitKeys = Object.keys(config.split)

  if (config.disabled) {
    return controlValue
  } else {
    let min = 0
    let max = min

    const slices = splitKeys.map((slice, i) => {
      const split = config.split[slice]
      if (split === undefined || !isFloat(split)) {
        throw new Error('Invalid split found in configuration')
      }

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
}
