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

        const start = process.hrtime();
        try {
            await info.value.call(suite);
            const duration = TestRunner.msSince(start);
            this.reporters.forEach(r => r.testPassed(suite, name, duration));
            return new TestResult(ResultType.Passed, duration);

        } catch (error) {
            const duration = TestRunner.msSince(start);
            this.reporters.forEach(r => r.testFailed(suite, name, error, duration));
            return new TestResult(ResultType.Failed, duration);
        }
    }

    private static msSince(start: [number, number]) {
        const duration = process.hrtime(start);
        return duration[0] * 1_000 + duration[1] / 1_000_000;
    }
}