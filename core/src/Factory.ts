import fs from "node:fs/promises";

import Args from "command-line-args";

import FileSystem from "./IO/FileSystem";
import Output from "./IO/Output";
import ConsoleReporter from "./Reporters/ConsoleReporter";
import JUnitReporter from "./Reporters/JUnitReporter";
import ResultReporter from "./Reporters/ResultReporter";
import SonarReporter from "./Reporters/SonarReporter";
import Runner from "./Runners/Runner";
import TestRunner from "./Runners/TestRunner";
import TestSuiteLoader from "./Runners/TestSuiteLoader";
import TestSuiteRunner from "./Runners/TestSuiteRunner";

export default class Factory {
	static readonly file_system = new FileSystem(fs);

	static Runner(args: Args.CommandLineOptions) {
		const loader = new TestSuiteLoader(Factory.file_system);
		const reporters = Factory.Reporters(args);
		const test_runner = new TestRunner(reporters);
		const test_suite_runner = new TestSuiteRunner(test_runner, reporters);

		return new Runner(loader, test_suite_runner, reporters);
	}

	static Reporters(args: Args.CommandLineOptions): readonly ResultReporter[] {
		return [
			args.quiet ? null : new ConsoleReporter(new Output(process.stdout)),
			args.junit === undefined ? null : new JUnitReporter(Factory.file_system, args.junit as string | undefined ?? JUnitReporter.defaultFileName),
			args.sonar === undefined ? null : new SonarReporter(Factory.file_system, args.sonar as string | undefined ?? SonarReporter.defaultFileName)
		].filter(r => r !== null);
	}
}