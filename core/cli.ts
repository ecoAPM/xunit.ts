#!/usr/bin/env node

import process from "node:process";
import CLI from "./src/CLI";
import Factory from "./src/Factory";

const cli = new CLI(Factory.Runner.bind(this), process);
const runTests = cli.run();

runTests.then(
	success => process.exit(success ? 0 : 1),
	(reason: unknown) => console.log(reason)
);