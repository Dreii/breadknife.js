# 🍞 Breadknife.js 🍞

[![Codecov Coverage](https://img.shields.io/codecov/c/github/Dreii/Breadknife.js/master.svg?style=flat-square)](https://codecov.io/gh/Dreii/Breadknife.js/)
  

Dead Simple A/B Testing so you can focus on getting that bread 🍞.

## Install
`npm install breadknife`
or
`yarn add breadknife`

## Usage

### Setting up a test

First import the library.
`import Breadknife from 'breadknife'`

Second you need a config file to list out the A/B tests you are using, the format is an array of objects, this can be anywhere in your code or even come from a database if need be.

```js
const  exampleConfig  = [
	{
		id:  'EXAMPLE_TEST',
		split:  {
			TEST: 0.5,
			CONTROL: 0.5
		},
	}
]
```

Once your config is set you have to initialize the tests.
`Breadknife.init(exampleConfig)`

Then you can check the slice of a test anywhere else in your code.
`Breadknife.getSlice('EXAMPLE_TEST')`
this will return a string matching one of the constants in `Breadknife.states` 
`'CONTROL'`
`'TEST'`
`'TEST_B'`
`'TEST_C'`

you can use this to conditionally render code:

```js
	let text
	if(Breadknife.getSlice('EXAMPLE_TEST') === Breadknife.states.TEST){
		text = "I'm test text!"
	} else {
		text = "I'm control text!"
	}

	console.log(text)
```

### Disabling a test
Breadknife stores all tests on the clients local storage so that slices can persist between sessions, if you need to temporarily disable a test without removing it you can add `disabled: true` to the config for that test. Disabled tests always return `'CONTROL'`

```js
const  exampleConfig  = [
	{
		id:  'EXAMPLE_TEST',
		split:  {
			TEST: 0.5,
			CONTROL: 0.5
		},
		disabled: true
	}
]
```

### Removing a test
If a test is not longer necessary it can simply be removed from the config and it wont be saved on the next `Breadknife.init()` call, if a test that does not exist is provided to the `Breadknife.getSlice()` function, it will always return `Breadknife.states.CONTROL`


## Config

### id
The `id` of a test must be a unique string, duplicate ID's in the same config result in an error.

### The split object
The split object must be a an object with at least a `TEST` and `CONTROL` parameter,
you can have up to a 4 way split test by adding a `TEST_B` and `TEST_C` to the object.

Finally, all of the values in the split object must be floats that when added together equal between `0.99` and `1` *(not just 1 because 3 way tests can sometimes result in imperfect math)*


Three way test:
```js
exampleConfig  = [
	{
		id:  'EXAMPLE_TEST',
		split:  {
			CONTROL:  0.33,
			TEST:  0.33,
			TEST_B:  0.33,
		},
	}
]
```

Four way test:
```js
exampleConfig  = [
	{
		id:  'EXAMPLE_TEST',
		split:  {
			CONTROL:  0.25,
			TEST:  0.25,
			TEST_B:  0.25,
			TEST_C:  0.25,
		},
	}
]
```

### Constants for easier test definition

Breadknife comes with 3 predefined constants `HALF_AND_HALF`, `THREE_WAY` and `FOUR_WAY` for when you just want a dead simple split for your tests.

```js
import Breadknife, { HALF_AND_HALF } from 'breadknife'
const  exampleConfig  = [
	{
		id:  'EXAMPLE_TEST',
		split:  HALF_AND_HALF
	},
	{
		id:  'EXAMPLE_3_WAY',
		split:  THREE_WAY
	},
	{
		id:  'EXAMPLE_4_WAY',
		split:  FOUR_WAY
	}
]
```

### Forcing a test version

If you need to force a test into a certain slice you can use the `Breadknife.forceTestSlice(id, state)` function.

### Listing all tests

If you need to return a list of all tests with their slices you can use
`Breadknife.getTests()`