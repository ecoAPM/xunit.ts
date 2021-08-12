# xunit.ts
### A TypeScript unit testing framework, following standard xUnit patterns

[![npm version](https://badge.fury.io/js/xunit.ts.svg)](https://npmjs.com/package/xunit.ts)
[![CI status](https://github.com/ecoAPM/xunit.ts/workflows/CI/badge.svg)](https://github.com/ecoAPM/xunit.ts/actions)
[![Code Coverage](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=coverage)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ecoAPM_xunit.ts&metric=security_rating)](https://sonarcloud.io/dashboard?id=ecoAPM_xunit.ts)

## Documentation

Detailed documentation is available at https://ecoAPM.github.io/xunit.ts

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

`MyTestSuite.ts`:

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

## Output

### Console

By default, `xunit.ts` will output test results to `stdout` so they can be captured by your terminal, or piped elsewhere:

```
~/example $ npm run test

My Test Suite
  ✓ My First Test

    Passed: 1
     Total: 1

~/example $ _ 
```

See the [full documentation](https://ecoAPM.github.io/xunit.ts) for a list of all available output options.

## Assertions

`xunit.ts` has a built-in assertion library, accessible via `this.assert...` from within a `TestSuite`, or you can use your favorite third-party one: anything that uses Node.js' `AssertionError` is supported.

If you prefer, you can `import { Assert } from 'xunit.ts` and call e.g. `Assert.true(expression);` instead of `this.assert.true(expression);` for any included assertion.

See the [full documentation](https://ecoAPM.github.io/xunit.ts) for a list of all available assertions.

## Contributing

Please be sure to read and follow ecoAPM's [Contribution Guidelines](CONTRIBUTING.md) when submitting issues or pull requests.

### Building / Testing locally

1. `npm install` or `yarn install` to download all dependencies
2. `npm run build` or `yarn build` will compile `xunit.ts` and its tests to the `dist` directory
3. `npm run test` or `yarn test` will run all unit tests in `dist/tests`
4. `npm run build && npm run test` or `yarn build && yarn test` will build and run tests in a single step

### Missing an assertion?

Create an issue or submit a pull request!
1. Add a new function to `src/Assertions`
2. Add tests for both the positive and negative cases in `tests/Assertions`
3. Add a field for the assertion to `src/Assertions/index.ts`