#!/usr/bin/env node

import Factory from './src/Factory';
import Runner from './src/Runner/Runner';

Factory.Runner().runAll(process.argv[2] || 'tests')
    .then((results) => {
        process.exit(Runner.allTestsPassed(results) ? 0 : 1);
    })
    .catch((error: Error) => {
        process.stderr.write(`An unhandled ${error.name} occurred: ${error.message}\n`);
        process.stderr.write(error.stack?.toString() || '(no call stack)\n');
        process.exit(1);
    });