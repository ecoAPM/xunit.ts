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

If you're using `rollup` or `vite`, you'll need to set `xunit.ts` as an `external` in your build config file (under `rollupOptions` in `vite`) for the tests to be detected.

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

#### Console

By default, `xunit.ts` will output test results to `stdout` so they can be captured by your terminal, or piped elsewhere:

```
~/example $ npm run test

My Test Suite
  ✓ My First Test

    Passed: 1
     Total: 1

~/example $ _ 
```

To prevent console output, pass the `--quiet` or `-q` flag.

#### JUnit

`xunit.ts` can produce a JUnit-formatted XML file, for consumption by other services, by passing the `--junit` or `-j` flag, followed by an optional filename.

`yarn xunit dist/tests -j results.xml`

If no filename is provided, results will be output to `junit.xml`.

#### SonarQube / SonarCloud

`xunit.ts` can produce a Sonar-formatted XML file, for consumption by SonarQube and/or SonarCloud, by passing the `--sonar` or `-s` flag, followed by an optional filename.

`yarn xunit dist/tests -s results.xml`

If no filename is provided, results will be output to `sonar.xml`.

Note that this currently only works if built tests are output to a directory parallel to their source: e.g. `tests` to `dist/tests`. 

## Assertions

`xunit.ts` has a built-in assertion library, or you can use your favorite third-party one: anything that uses Node.js' `AssertionError` is supported.

If you prefer, you can `import { Assert } from 'xunit.ts` and call e.g. `Assert.true(expression);` instead of `this.assert.true(expression);` for any included assertion.

### Basic

#### True

```
this.assert.true(expression);
```

Passes if `expression` evaluates to `true`

Fails if `expression` does not evaluate to `true`

#### False

```
this.assert.false(expression);
```

Passes if `expression` evaluates to `false`

Fails if `expression` does not evaluate to `false`

### Equality

#### Equal

(uses `lodash.equal()` under the hood for strongly-typed, deep equality checks)

```
this.assert.equal(expected, actual);
```

Passes if `actual` and `expected` evaluate to equal values

Fails if `actual` and `expected` do not evaluate to equal values

#### Not Equal

```
this.assert.notEqual(expected, actual);
```

Passes if `actual` and `expected` do not evaluate to equal values

Fails if `actual` and `expected` evaluate to equal values

### Nullable

#### Is Null

```
this.assert.null(expression);
```

Passes if `expression` evaluates to `null`

Fails if `expression` does not evaluate to `null`

#### Not Null

```
this.assert.notNull(expression);
```

Passes if `expression` does not evaluate to `null`

Fails if `expression` evaluates to `null`

#### Undefined

```
this.assert.undefined(expression);
```

Passes if `expression` evaluates to `undefined`

Fails if `expression` does not evaluate to `undefined`

#### Not Undefined

```
this.assert.defined(expression);
```

Passes if `expression` does not evaluate to `undefined`

Fails if `expression` evaluates to `undefined`

### Arrays

#### Contains

```
this.assert.contains(needle, haystack);
```

Passes if array `haystack` contains an element with a value of `needle`

Fails if array `haystack` does not contain an element with a value of `needle`

#### Does Not Contain

```
this.assert.doesNotContain(needle, haystack);
```

Passes if array `haystack` does not contain an element with a value of `needle`

Fails if array `haystack` contains an element with a value of `needle`

#### Is Empty

```
this.assert.empty(array);
```

Passes if `array` contains zero elements

Fails if `array` contains any elements

#### Is Not Empty

```
this.assert.notEmpty(array);
```

Passes if `array` contains any elements

Fails if `array` contains zero elements

#### Count / Length

```
this.assert.count(expected, array);
```

Passes if `array` contains `expected` number of elements

Fails if `array` does not contain `expected` number of elements

### Strings

#### Contains

```
this.assert.stringContains(needle, haystack);
```

Passes if `needle` is a substring of `haystack`

Fails if `needle` is not a substring of `haystack`

#### Does Not Contain

```
this.assert.stringDoesNotContain(needle, haystack);
```

Passes if `needle` is not a substring of `haystack`

Fails if `needle` is a substring of `haystack`

#### Starts With

```
this.assert.stringStartsWith(needle, haystack);
```

Passes if the first characters of `haystack` match `needle`

Fails if the first characters of `haystack` do not match `needle`

#### Does Not Start With

```
this.assert.stringDoesNotStartWith(needle, haystack);
```

Passes if the first characters of `haystack` do not match `needle`

Fails if the first characters of `haystack` match `needle`

#### Ends With

```
this.assert.stringEndsWith(needle, haystack);
```

Passes if the final characters of `haystack` match `needle`

Fails if the final characters of `haystack` do not match `needle`

#### Does Not End With

```
this.assert.stringDoesNotEndWith(needle, haystack);
```

Passes if the final characters of `haystack` do not match `needle`

Fails if the final characters of `haystack` match `needle`

### Exceptions

#### Throws

```
this.assert.throws(() => expression);
```

Passes if `expression` throws an error/exception

Fails if `expression` does not throw an error/exception

#### Does Not Throw

```
this.assert.doesNotThrow(() => expression);
```

Passes if `expression` does not throw an error/exception

Fails if `expression` throws an error/exception

### Reflection

#### Is Instance Of

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

### Building / Testing locally

1. `npm install` or `yarn install` to download all dependencies
1. `npm run build` or `yarn build` will compile `xunit.ts` and its tests to the `dist` directory
1. `npm run test` or `yarn test` will run all unit tests in `dist/tests`
1. `npm run build && npm run test` or `yarn build && yarn test` will build and run tests in a single step