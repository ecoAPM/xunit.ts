#!/usr/bin/env node

import Runner from '../src/Runner';

const runner = new Runner();
const start_time = Date.now();
runner.runAll()
    .then((result) => {
        console.log();
        console.log('All tests completed.');
    })
    .catch((error: Error) => {
        console.error('An unhandled exception occurred:');
        console.error(error);
    })
    .finally(() => {
        const end_time = Date.now();
        const total_time = end_time - start_time;
        console.log(`Done in ${total_time}ms.`);
    });