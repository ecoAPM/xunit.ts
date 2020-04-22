import TestInfo from './TestInfo';
import TestSuite from './TestSuite';
import { TestResult } from './TestResult';
import ResultReporter from './ResultReporter';
import { AssertionError } from 'assert';

export default class TestRunner {

    private reporter: ResultReporter;

    public constructor(reporter: ResultReporter) {
        this.reporter = reporter;
    }

    public async runTest(name: string, info: TestInfo, suite: TestSuite): Promise<TestResult> {
        this.reporter.testStarted(suite, name);
        if (info.value == null) {
            this.reporter.testIncomplete(suite, name, 0);
            return TestResult.Incomplete;
        }

        try {
            await info.value.call(suite);
            this.reporter.testPassed(suite, name, 0);
            return TestResult.Passed;

        } catch (error) {
            this.reporter.testFailed(suite, name, error, 0);
            return TestResult.Failed;
        }
    }
}