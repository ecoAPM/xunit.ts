---
permalink: /
---

# xunit.ts

## A TypeScript unit testing framework, following standard xUnit patterns

### Requirements

- Node.js 16

  (older versions may work, but only the latest LTS is actively supported)

### Installation

<kbd>npm install --dev xunit.ts</kbd>

or

<kbd>~$ yarn add --dev xunit.ts<kbd>

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

You'll need to compile your TypeScript tests into JavaScript using `tsc` or a bundler such as `rollup`, `parcel`, `vite`, etc. (these are the supported ones, feel free to add a test case for your favorite to the `compiler-tests` directory!)

Then run:

<kbd>npm run xunit compiled_tests_dir</kbd>

or

<kbd>yarn xunit compiled_tests_dir</kbd>

to run the tests.

You can also run `xunit.ts` from a script in your `package.json`:

```json
{
    "scripts": {
        "test": "tsc --outDir compiled_tests_dir && xunit compiled_tests_dir"
    }
}
```