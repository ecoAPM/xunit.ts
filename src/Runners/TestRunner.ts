import TestInfo from '../Framework/TestInfo';
import TestSuite from '../Framework/TestSuite';
import { ResultType } from '../Framework/ResultType';
import ResultReporter from '../Reporters/ResultReporter';
import TestResult from "../Framework/TestResult";
import {AssertionError} from "assert";

export default class TestRunner {

    constructor(private readonly reporters: ResultReporter[]) { }

    async runTest(name: string, info: TestInfo, suite: TestSuite): Promise<TestResult> {
        await Promise.all(this.reporters.map(r => r.testStarted(suite, name)));
        if (info.value === undefined) {
            await Promise.all(this.reporters.map(r => r.testIncomplete(suite, name)));
            return new TestResult(ResultType.Incomplete, 0);
        }

        const start = process.hrtime();
        try {
            await info.value.call(suite);
            const duration = TestRunner.msSince(start);
            await Promise.all(this.reporters.map(r => r.testPassed(suite, name, duration)));
            return new TestResult(ResultType.Passed, duration);

        } catch (error) {
            const duration = TestRunner.msSince(start);
            if (error instanceof AssertionError) {
                await Promise.all(this.reporters.map(r => r.testFailed(suite, name, error, duration)));
                return new TestResult(ResultType.Failed, duration, error);
            }

            await Promise.all(this.reporters.map(r => r.testErrored(suite, name, error, duration)));
            return new TestResult(ResultType.Error, duration, error);
        }
    }

    private static msSince(start: [number, number]) {
        const duration = process.hrtime(start);
        return duration[0] * 1_000 + duration[1] / 1_000_000;
    }
}