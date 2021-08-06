import Args from 'command-line-args';
import ConsoleReporter from './Runner/ConsoleReporter';
import FileSystem from './Runner/FileSystem';
import JUnitReporter from './Runner/JUnitReporter';
import Output from './Runner/Output';
import ResultReporter from './Runner/ResultReporter';
import Runner from './Runner/Runner';
import TestRunner from './Runner/TestRunner';
import TestSuiteLoader from './Runner/TestSuiteLoader';
import TestSuiteRunner from './Runner/TestSuiteRunner';
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