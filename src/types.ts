export interface Split {
  [index: string]: number | undefined
  CONTROL: number
  TEST: number
  TEST_B?: number
  TEST_C?: number
}

export interface Test {
  id: string
  name: string
  split: Split
  disabled?: boolean
  slice?: string
}

export interface States {
  CONTROL: string
  TEST: string
  TEST_B: string
  TEST_C: string
}
