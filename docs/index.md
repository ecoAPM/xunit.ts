---
permalink: /
---

# xunit.ts

## A TypeScript unit testing framework, following standard xUnit patterns

### Requirements

- Node.js 14, 16, 18, 20

  (other versions may work, but only the latest minor release for each current/active/maintenance LTS version is supported)

- A supported TypeScript compiler
  - TypeScript (v4, v5)
  - Vite (v2, v3, v4)
  - Rollup (v2, v3, v4)
  - Parcel (v1, v2)
  - Webpack (v5)

Note that 1.4.0 is the last release that will support legacy versions of the above; v2.0 (expected Q4 2023) will support:
  - Node.js 18+
  - TypeScript 5+
  - Vite 4+
  - Rollup 4+
  - Parcel 2+
  - Webpack 5+

Ongoing gommercial support for legacy versions is available for [Corporate, Premier, and Title Sponsors](https://github.com/sponsors/ecoAPM).

### Installation

<kbd>npm install --dev xunit.ts</kbd>

or

<kbd>yarn add --dev xunit.ts</kbd>

### Configure your test project

At a minimum, your `tsconfig.json` will require the following:

```json
{
	"compilerOptions": {
		"target": "ES2015", //or "ES6"
		"module": "CommonJS",
		"experimentalDecorators": true
	}
}
```

If you're using a bundler, you'll need to declare `xunit.ts` as an `external` in your build config file for the tests to be detected.  See the [officially-supported configurations](https://github.com/ecoAPM/xunit.ts/tree/main/compiler-tests) in the `compiler-tests` directory of the source code for detailed examples.

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

You'll first need to compile your TypeScript tests into JavaScript using `tsc` or the supported bundler of your choice.

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

### Filtering tests

If you don't want to run your entire test suite, you can pass one or more `--filter` flags to the `xunit` command.

Filters are regular expressions that will match against the string `{TestSuiteName}.{TestMethodName}`.

Using our example above, of a test suite named `MyTestSuite` with a test method named `MyFirstTest`, we could use any of the following filters to include that test in our test run:

- `MyTestSuite`
- `MyFirstTest`
- `MyTestSuite.MyFirstTest`
- `^MyTestSuite\.MyFirstTest$`
