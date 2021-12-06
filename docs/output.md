---
---

## Output Options

### Console

By default, `xunit.ts` will output test results to `stdout` so they can be captured by your terminal, or piped
elsewhere:

<kbd>npm run test</kbd>

```
My Test Suite
  ✓ My First Test

    Passed: 1
     Total: 1
```

To prevent console output, pass the `--quiet` or `-q` flag.

### JUnit

`xunit.ts` can produce a JUnit-formatted XML file, for consumption by other services, by passing the `--junit` or `-j`
flag, followed by an optional filename.

<kbd>yarn xunit dist/tests -j results.xml</kbd>

If no filename is provided, results will be output to `junit.xml`.

### SonarQube / SonarCloud

`xunit.ts` can produce a Sonar-formatted XML file, for consumption by SonarQube and/or SonarCloud, by passing
the `--sonar` or `-s` flag, followed by an optional filename.

<kbd>yarn xunit dist/tests -s results.xml</kbd>

If no filename is provided, results will be output to `sonar.xml`.

Note that this currently only works if built tests are output to a directory parallel to their source: e.g. from `tests`
to `dist/tests`.