# xunit.ts
### A TypeScript unit testing framework, following standard xUnit patterns

[![npm version](https://badge.fury.io/js/xunit.ts.svg)](https://npmjs.com/package/xunit.ts)
[![CI status](https://github.com/ecoAPM/xunit.ts/workflows/CI/badge.svg)](https://github.com/ecoAPM/xunit.ts/actions)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=coverage)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=security_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)

## Quick Start

### Requirements

- Node.js 16

  (older versions may work, but only the latest LTS is actively supported)

### Installation
`npm install --dev xunit.ts`
or
`yarn add --dev xunit.ts`

### Configure your test project
At a minimum, your `tsconfig.json` will require the following:
```json
{
    "compilerOptions": {
        "target": "ES5", //or "ES6"
        "module": "CommonJS",
        "experimentalDecorators": true
    }
}
```

If you're using `vite`, you'll need to set `xunit.ts` as an `external` in your build config file's `rollupOptions` for the tests to be detected.

### Create your first test
`MyTestSuite.ts`
```ts
import { Test, TestSuite } from 'xunit.ts';

export default class MyTestSuite extends TestSuite {
    @Test()
    async MyFirstTest() {
        this.assert.equal(2, 1 + 1);
    }
}
```

### Run your tests
You'll need to compile your TypeScript tests into JavaScript using `tsc` or a bundler such as `rollup`, `parcel`, `vite`, etc. (these are the supported ones, feel free to add your favorite to the `compiler-tests` directory!)

Then run:
`npm run xunit compiled_tests_dir`
or
`yarn xunit compiled_tests_dir`
to run the tests.

You can also run `xunit.ts` from a script in your `package.json`:
```json
{
    "scripts": {
        "test": "tsc --outDir compiled_tests_dir && xunit compiled_tests_dir"
    }
}
```

### Output
By default, `xunit.ts` will output test results to `stdout` so they can be captured by your terminal, or piped elsewhere:
```
~/example $ npm run test

My Test Suite
  ✓ My First Test

    Passed: 1
     Total: 1

~/example $ _ 
```

## Assertions

`xunit.ts` has a built-in assertion library, or you can use your favorite third-party one: anything that uses Node.js' `AssertionError` is supported.

If you prefer, you can `import { Assert } from 'xunit.ts` and call e.g. `Assert.true(expression);` instead of `this.assert.true(expression);` for any included assertion.

### Basic

```
this.assert.true(expression);
```

Passes if `expression` evaluates to `true`

Fails if `expression` does not evaluate to `true`

```
this.assert.false(expression);
```

Passes if `expression` evaluates to `false`

Fails if `expression` does not evaluate to `false`

### Equality

(uses `lodash.equal()` under the hood for strongly-typed, deep equality checks)

```
this.assert.equal(expected, actual);
```

Passes if `actual` and `expected` evaluate to equal values

Fails if `actual` and `expected` do not evaluate to equal values

```
this.assert.notEqual(expected, actual);
```

Passes if `actual` and `expected` do not evaluate to equal values

Fails if `actual` and `expected` evaluate to equal values

### Nullable

```
this.assert.null(expression);
```

Passes if `expression` evaluates to `null`

Fails if `expression` does not evaluate to `null`

```
this.assert.notNull(expression);
```

Passes if `expression` does not evaluate to `null`

Fails if `expression` evaluates to `null`

```
this.assert.undefined(expression);
```

Passes if `expression` evaluates to `undefined`

Fails if `expression` does not evaluate to `undefined`

```
this.assert.defined(expression);
```

Passes if `expression` does not evaluate to `undefined`

Fails if `expression` evaluates to `undefined`

### Arrays

```
this.assert.contains(needle, haystack);
```

Passes if array `haystack` contains an element with a value of `needle`

Fails if array `haystack` does not contain an element with a value of `needle`

```
this.assert.doesNotContain(needle, haystack);
```

Passes if array `haystack` does not contain an element with a value of `needle`

Fails if array `haystack` contains an element with a value of `needle`

```
this.assert.empty(array);
```

Passes if `array` contains zero elements

Fails if `array` contains any elements

```
this.assert.notEmpty(array);
```

Passes if `array` contains any elements

Fails if `array` contains zero elements

```
this.assert.count(expected, array);
```

Passes if `array` contains `expected` number of elements

Fails if `array` does not contain `expected` number of elements

### Strings

```
this.assert.stringContains(needle, haystack);
```

Passes if `needle` is a substring of `haystack`

Fails if `needle` is not a substring of `haystack`

```
this.assert.stringDoesNotContain(needle, haystack);
```

Passes if `needle` is not a substring of `haystack`

Fails if `needle` is a substring of `haystack`

### Exceptions

```
this.assert.throws(() => expression);
```

Passes if `expression` throws an error/exception

Fails if `expression` does not throw an error/exception

```
this.assert.doesNotThrow(() => expression);
```

Passes if `expression` does not throw an error/exception

Fails if `expression` throws an error/exception

### Reflection

```
this.assert.instanceOf(type, object);
```

Passes if `object`'s type matches `type`

Fails if `object`'s type does not match `type` 

### Missing an assertion?

Create an issue or submit a pull request!
1. Add a new function to `src/Assertions`
2. Add tests for both the positive and negative cases in `tests/Assertions`
3. Add a field for the assertion to `src/Assertions/index.ts`

See [Contributing](#Contributing) section below for details

## Contributing

Please be sure to read and follow ecoAPM's [Contribution Guidelines](CONTRIBUTING.md) when submitting issues or pull requests.

### Building / Testing

- `npm run build` or `yarn build` will compile `xunit.ts` and its tests to the `dist` directory
- `npm run test` or `yarn test` will run all unit tests in `dist/tests`
- `npm run build && npm run test` or `yarn build && yarn test` to build and run tests in a single step