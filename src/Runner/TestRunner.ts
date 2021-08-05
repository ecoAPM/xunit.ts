import TestInfo from '../Framework/TestInfo';
import TestSuite from '../Framework/TestSuite';
import { ResultType } from '../Framework/ResultType';
import ResultReporter from './ResultReporter';
import TestResult from "../Framework/TestResult";

export default class TestRunner {

    constructor(private reporters: ResultReporter[]) { }

    async runTest(name: string, info: TestInfo, suite: TestSuite): Promise<TestResult> {
        this.reporters.forEach(r => r.testStarted(suite, name));
        if (info.value == null) {
            this.reporters.forEach(r => r.testIncomplete(suite, name));
            return new TestResult(ResultType.Incomplete, 0);
        }

        try {
            await info.value.call(suite);
            this.reporters.forEach(r => r.testPassed(suite, name));
            return new TestResult(ResultType.Passed, 0);

        } catch (error) {
            this.reporters.forEach(r => r.testFailed(suite, name, error));
            return new TestResult(ResultType.Failed, 0);
        }
    }
}