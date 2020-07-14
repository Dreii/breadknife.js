module.exports = getStoredTests = () => {
  const rawData = window.localStorage.getItem('_BREADKNIFE_TESTS') || '[]'
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
