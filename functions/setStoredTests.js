module.exports = setStoredTest = (rawData) => {
  const packagedData = JSON.stringify(rawData)
  window.localStorage.setItem('_BREADKNIFE_TESTS', packagedData)
}
