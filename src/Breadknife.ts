import { Split, Test, States } from './types'
import { checkIfTestSlicesEqual100, getTestSlice, setStoredTests, getStoredTests } from './functions/'

class Breadknife {
  tests: Test[]
  states: States

  constructor() {
    this.tests = []

    this.states = {
      TEST: 'TEST',
      TEST_B: 'TEST_B',
      TEST_C: 'TEST_C',
      CONTROL: 'CONTROL',
    }
  }

  init(configuration: any) {
    this.tests = getStoredTests() || []

    this.tests = this.tests.filter(oldTest => !!configuration.find((newTest: Test) => oldTest.id === newTest.id))

    const testIds: string[] = []
    configuration.forEach((config: Test) => {
      if (!config.id || testIds.find(otherId => otherId === config.id))
        throw new Error('Configuration must have unique ID')
      testIds.push(config.id)
      const exsistingTest = this.tests.find(oldTest => oldTest.id === config.id)
      if (config.disabled && exsistingTest) exsistingTest.slice = this.states.CONTROL
      if (exsistingTest) return

      checkIfTestSlicesEqual100.bind(config)
      const slice = getTestSlice(config, this.states.CONTROL)
      this.tests.push({ ...config, slice })
    })

    setStoredTests(this.tests)
  }

  getTests() {
    return this.tests
  }

  getTestSlice(id: string) {
    const foundTest = this.tests.find(testSearch => testSearch.id === id)
    return (foundTest && foundTest.slice) || this.states.CONTROL
  }

  forceTestSlice(id: string, state: string) {
    const testIndex: number = this.tests.findIndex(testSearch => testSearch.id === id)
    if (testIndex >= 0) {
      this.tests[testIndex].slice = state
    } else {
      throw new Error('Id given for non exsisting test.')
    }
  }
}

const breadknife = new Breadknife()

export default breadknife

export const HALF_AND_HALF: Split = {
  CONTROL: 0.5,
  TEST: 0.5,
}

export const THREE_WAY: Split = {
  CONTROL: 0.33,
  TEST: 0.33,
  TEST_B: 0.33,
}

export const FOUR_WAY: Split = {
  CONTROL: 0.25,
  TEST: 0.25,
  TEST_B: 0.25,
  TEST_C: 0.25,
}
