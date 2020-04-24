import FileSystem from './FileSystem';
import ConsoleReporter from './ConsoleReporter';
import Output from './Output';
import TestSuiteLoader from './TestSuiteLoader';
import TestSuiteRunner from './TestSuiteRunner';
import TestRunner from './TestRunner';
import Runner from './Runner';

export default class Factory {
    public static Runner(): Runner {
        const file_system = new FileSystem();
        const loader = new TestSuiteLoader(file_system);

        const output = new Output(process.stdout);
        const reporter = new ConsoleReporter(output);

        const test_runner = new TestRunner(reporter);
        const test_suite_runner = new TestSuiteRunner(test_runner, reporter);

        return new Runner(loader, test_suite_runner, reporter);
    }
}