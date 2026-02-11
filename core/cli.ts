#!/usr/bin/env node

import process from "node:process";
import CLI from "./src/CLI";
import Factory from "./src/Factory";

new CLI(Factory.Runner, process)
	.run()
	.then(success => process.exit(success ? 0 : 1));