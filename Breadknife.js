const { checkIfTestSlicesEqual100, getTestSlice, setStoredTests, getStoredTests } = require('./functions')

class Breadknife {
  static init(configuration) {
    this.tests = getStoredTests()
    this.tests = this.tests.filter(oldTest => !!configuration.find((newTest) => oldTest.id === newTest.id))

    const testIds = []
    configuration.forEach((config) => {
      if (!config.id || testIds.find(otherId => otherId === config.id))
        throw new Error('Configuration must have unique ID')
      testIds.push(config.id)
      const exsistingTest = this.tests.find(oldTest => oldTest.id === config.id)
      if (config.disabled && exsistingTest) exsistingTest.slice = this.CONTROL
      if (exsistingTest) return

      checkIfTestSlicesEqual100(config)
      const slice = getTestSlice(config, this.CONTROL)
      this.tests.push({ ...config, slice })
    })

    setStoredTests(this.tests)
  }

  static getTests() {
    return this.tests
  }

  static getTestSlice(id) {
    const foundTest = this.tests.find(testSearch => testSearch.id === id)
    return (foundTest && foundTest.slice) || this.CONTROL
  }

  static getSlice(id) {
    return this.getTestSlice(id)
  }

  static forceTestSlice(id, state) {
    const testIndex = this.tests.findIndex(testSearch => testSearch.id === id)
    if (testIndex >= 0) {
      this.tests[testIndex].slice = state
    } else {
      throw new Error('Id given for non exsisting test.')
    }
  }
}

Breadknife.tests = []

Breadknife.HALF_AND_HALF = {
  CONTROL: 0.5,
  TEST: 0.5,
}

Breadknife.THREE_WAY = {
  CONTROL: 0.33,
  TEST: 0.33,
  TEST_B: 0.33,
}

Breadknife.FOUR_WAY = {
  CONTROL: 0.25,
  TEST: 0.25,
  TEST_B: 0.25,
  TEST_C: 0.25,
}

Breadknife.TEST = 'TEST'
Breadknife.TEST_B = 'TEST_B'
Breadknife.TEST_C = 'TEST_C'
Breadknife.CONTROL = 'CONTROL'

module.exports = Breadknife