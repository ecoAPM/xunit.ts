import FileSystem from './Runner/FileSystem';
import ConsoleReporter from './Runner/ConsoleReporter';
import Output from './Runner/Output';
import TestSuiteLoader from './Runner/TestSuiteLoader';
import TestSuiteRunner from './Runner/TestSuiteRunner';
import TestRunner from './Runner/TestRunner';
import Runner from './Runner/Runner';

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