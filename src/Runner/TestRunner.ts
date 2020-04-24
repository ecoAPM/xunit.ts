import TestInfo from '../Framework/TestInfo';
import TestSuite from '../Framework/TestSuite';
import { TestResult } from '../Framework/TestResult';
import ResultReporter from './ResultReporter';

export default class TestRunner {

    constructor(private reporter: ResultReporter) { }

    async runTest(name: string, info: TestInfo, suite: TestSuite): Promise<TestResult> {
        this.reporter.testStarted(suite, name);
        if (info.value == null) {
            this.reporter.testIncomplete(suite, name);
            return TestResult.Incomplete;
        }

        try {
            await info.value.call(suite);
            this.reporter.testPassed(suite, name);
            return TestResult.Passed;

        } catch (error) {
            this.reporter.testFailed(suite, name, error);
            return TestResult.Failed;
        }
    }
}