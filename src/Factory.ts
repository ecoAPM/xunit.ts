import AsyncFileSystemModule from './Runner/AsyncFileSystemModule';
import ConsoleReporter from './Runner/ConsoleReporter';
import FileSystem from './Runner/FileSystem';
import Output from './Runner/Output';
import ResultReporter from './Runner/ResultReporter';
import Runner from './Runner/Runner';
import TestRunner from './Runner/TestRunner';
import TestSuiteLoader from './Runner/TestSuiteLoader';
import TestSuiteRunner from './Runner/TestSuiteRunner';

export default class Factory {
    static Runner() {
        const async_fs = new AsyncFileSystemModule();
        const file_system = new FileSystem(async_fs);
        const loader = new TestSuiteLoader(file_system);

        const output = new Output(process.stdout);
        const console_reporter = new ConsoleReporter(output);
        
        const reporters: ResultReporter[] = [console_reporter];

        const test_runner = new TestRunner(reporters);
        const test_suite_runner = new TestSuiteRunner(test_runner, reporters);

        return new Runner(loader, test_suite_runner, reporters);
    }
}