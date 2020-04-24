#!/usr/bin/env node

import Factory from './src/Factory';
import TestSuiteResults from './src/Framework/TestSuiteResults';

Factory.Runner().runAll(process.argv[2] || 'tests')
    .then((results: TestSuiteResults[]) => {
        process.exit(results.length ? 0 : 1);
    })
    .catch((error: Error) => {
        process.stderr.write(`An unhandled ${error.name} occurred: ${error.message}\n`);
        process.stderr.write(error.stack?.toString() || '(no call stack)\n');
        process.exit(1);
    });