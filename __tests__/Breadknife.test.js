const Breadknife = require('../Breadknife')
const { HALF_AND_HALF, THREE_WAY, FOUR_WAY } = Breadknife
const { getTestSlice } = require('../functions')

test('Breadknife exports successfully', () => {
  expect(Breadknife).toEqual(expect.anything())
})

test('Breadknife does not break when no tests are provided', () => {
  Breadknife.init([])
  const tests = Breadknife.getTests()
  expect(tests.length).toEqual(0)
})

test('Breadknife loads a valid configuration file with one test', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const tests = Breadknife.getTests()
  expect(tests.length).toEqual(1)
})

test('Breadknife removes tests that are no longer in the configuration', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  let tests = Breadknife.getTests()
  expect(tests.length).toEqual(1)

  Breadknife.init([])
  tests = Breadknife.getTests()
  expect(tests.length).toEqual(0)
})

test('Force Test works', () => {})

test('Breadknife loads a valid configuration file with two tests', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
    {
      id: 'EXAMPLE_TEST2',
      name: 'Example Test 2',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const tests = Breadknife.getTests()
  expect(tests.length).toEqual(2)
})

test('Breadknife loads a valid configuration file with three tests', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
    {
      id: 'EXAMPLE_TEST2',
      name: 'Example Test 2',
      split: HALF_AND_HALF,
    },
    {
      id: 'EXAMPLE_TEST3',
      name: 'Example Test 3',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const tests = Breadknife.getTests()
  expect(tests.length).toEqual(3)
})

test('Breadknife Constants for predefined splits are correct', () => {
  expect(HALF_AND_HALF).toStrictEqual({ CONTROL: 0.5, TEST: 0.5 })
  expect(THREE_WAY).toStrictEqual({ CONTROL: 0.33, TEST: 0.33, TEST_B: 0.33 })
  expect(FOUR_WAY).toStrictEqual({ CONTROL: 0.25, TEST: 0.25, TEST_B: 0.25, TEST_C: 0.25 })
})

test('Duplicate test IDs in a configuration should throw an error', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'DUPLICATE_TEST',
      name: 'Duplicate Test',
      split: HALF_AND_HALF,
    },
    {
      id: 'DUPLICATE_TEST',
      name: 'Duplicate Test',
      split: HALF_AND_HALF,
    },
  ]
  expect(() => Breadknife.init(testConfig)).toThrow()
})

test('Test with duplicate ID called consequtively should not add another test.', () => {
  const testConfig = [
    {
      id: 'DUPLICATE_TEST',
      name: 'Duplicate Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init([])
  Breadknife.init(testConfig)
  Breadknife.init(testConfig)

  const tests = Breadknife.getTests()

  expect(tests.length).toBe(1)
})

test('A test configuration with slices that dont add up to at least 99% should throw an error', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: {
        TEST: 0.8,
        CONTROL: 0.5,
      },
    },
  ]

  expect(() => Breadknife.init(testConfig)).toThrow()
})

test('Initialized tests should save to local storage', () => {
  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init([])
  Breadknife.init(testConfig)

  const stored = window.localStorage.getItem('_BREADKNIFE_TESTS') || ''
  const parsed = JSON.parse(stored)
  const firstTest = parsed ? parsed[0] : null

  expect(parsed.length).toBe(1)
  expect(firstTest.id).toBe('EXAMPLE_TEST')
  expect(firstTest.name).toBe('Example Test')
  expect(firstTest.split).toStrictEqual(HALF_AND_HALF)
  expect([Breadknife.CONTROL, Breadknife.TEST]).toContain(firstTest.slice)
})

test('invalid local storage should fail silently and read as empty.', () => {
  window.localStorage.setItem('_BREADKNIFE_TESTS', '3hj4l2b3hjkl2b')
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const tests = Breadknife.getTests()
  expect(tests.length).toBe(1)
})

test('Half and Half Test results in Control Or Test slice.', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const result = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect([Breadknife.CONTROL, Breadknife.TEST]).toContain(result)
})

test('getSlice alias of getTestSlice works', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: HALF_AND_HALF,
    },
  ]

  Breadknife.init(testConfig)
  const result = Breadknife.getSlice('EXAMPLE_TEST')
  expect([Breadknife.CONTROL, Breadknife.TEST]).toContain(result)
})

test('Three Way Test results in Control, Test or Test B slice.', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: THREE_WAY,
    },
  ]

  Breadknife.init(testConfig)
  const result = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect([Breadknife.CONTROL, Breadknife.TEST, Breadknife.TEST_B]).toContain(result)
})

test('Four Way Test results in Control, Test, Test B, or Text C slice.', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: FOUR_WAY,
    },
  ]

  Breadknife.init(testConfig)
  const result = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect([Breadknife.CONTROL, Breadknife.TEST, Breadknife.TEST_B, Breadknife.TEST_C]).toContain(result)
})

test('Forcing a test results in the test changing to the correct slice.', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: FOUR_WAY,
    },
  ]

  Breadknife.init(testConfig)

  Breadknife.forceTestSlice('EXAMPLE_TEST', Breadknife.CONTROL)
  const result = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect(result).toBe(Breadknife.CONTROL)

  Breadknife.forceTestSlice('EXAMPLE_TEST', Breadknife.TEST)
  const result2 = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect(result2).toBe(Breadknife.TEST)
})

test('Forcing non exsisting test results in an error', () => {
  Breadknife.init([])
  expect(() => Breadknife.forceTestSlice('EXAMPLE_TEST', Breadknife.CONTROL)).toThrow()
})

test('Asking for a slice state from a test not in the list, returns Control state', () => {
  Breadknife.init([])
  const slice = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect(slice).toBe(Breadknife.CONTROL)
})

test('Disabling a test results in its state becoming control', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: FOUR_WAY,
      disabled: true,
    },
  ]

  Breadknife.init(testConfig)
  const slice = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect(slice).toBe(Breadknife.CONTROL)
})

test('Disabling a previously stored test results in its state becoming control', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: FOUR_WAY,
    },
  ]

  Breadknife.init(testConfig)

  const testConfig2 = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: FOUR_WAY,
      disabled: true,
    },
  ]

  Breadknife.init(testConfig2)

  const slice = Breadknife.getTestSlice('EXAMPLE_TEST')
  expect(slice).toBe(Breadknife.CONTROL)
})

test('Giving test a split with a non float value results in an error', () => {
  Breadknife.init([])

  const testConfig = [
    {
      id: 'EXAMPLE_TEST',
      name: 'Example Test',
      split: {
        TEST: 5,
        CONTROL: 0.2,
      },
    },
  ]

  expect(() => Breadknife.init(testConfig)).toThrow()

  expect(() => getTestSlice(testConfig[0], Breadknife.CONTROL)).toThrow()
})
