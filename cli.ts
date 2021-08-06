#!/usr/bin/env node

import process from 'process';
import CLI from './src/CLI';

new CLI(process)
    .run()
    .then(success => process.exit(success ? 0 : 1));