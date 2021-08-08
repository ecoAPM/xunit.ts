import Args from 'command-line-args';
import ConsoleReporter from './Reporters/ConsoleReporter';
import FileSystem from './IO/FileSystem';
import JUnitReporter from './Reporters/JUnitReporter';
import Output from './IO/Output';
import ResultReporter from './Reporters/ResultReporter';
import Runner from './Runners/Runner';
import TestRunner from './Runners/TestRunner';
import TestSuiteLoader from './Runners/TestSuiteLoader';
import TestSuiteRunner from './Runners/TestSuiteRunner';
import fs from "fs/promises";

export default class Factory {
    private static readonly file_system = new FileSystem(fs);

    static Runner(args: Args.CommandLineOptions) {
        const loader = new TestSuiteLoader(this.file_system);
        const reporters = this.Reporters(args);
        const test_runner = new TestRunner(reporters);
        const test_suite_runner = new TestSuiteRunner(test_runner, reporters);

        return new Runner(loader, test_suite_runner, reporters);
    }

    static Reporters(args: Args.CommandLineOptions): ResultReporter[] {
        return [
            !args.quiet ? new ConsoleReporter(new Output(process.stdout)) : null,
            args.junit !== undefined ? new JUnitReporter(this.file_system, args.report ?? JUnitReporter.defaultFileName) : null
        ].filter(r => r !== null) as ResultReporter[];
    }
}