import ResultReporter from './ResultReporter';
import TestSuite from '../Framework/TestSuite';
import TestSuiteResults from '../Framework/TestSuiteResults';
import TestInfo from '../Framework/TestInfo';
import TestRunner from './TestRunner';

export default class TestSuiteRunner {

    constructor(private runner: TestRunner, private reporter: ResultReporter) { }

    async runSuite(suite: TestSuite): Promise<TestSuiteResults> {
        this.reporter.suiteStarted(suite);
        const tests = suite.getTests();
        const results = await this.runTests(suite, tests);
        this.reporter.suiteCompleted(suite, results);
        return results;
    }

    async runTests(suite: TestSuite, tests: Record<string, TestInfo>): Promise<TestSuiteResults> {
        const results = new TestSuiteResults();
        if (tests == null || Object.keys(tests).length == 0) {
            this.reporter.testIncomplete(suite, '(no tests found)');
            return results;
        }

        const test_names = Object.keys(tests);
        for (let x = 0; x < test_names.length; x++) {
            const name = test_names[x];
            const result = await this.runner.runTest(name, tests[name], suite);
            results.addResult(name, result);
        }

        return results;
    }
}