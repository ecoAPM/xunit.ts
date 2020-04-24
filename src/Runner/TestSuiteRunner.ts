import ResultReporter from './ResultReporter';
import TestSuite from '../Framework/TestSuite';
import TestSuiteResults from '../Framework/TestSuiteResults';
import TestInfo from '../Framework/TestInfo';
import TestRunner from './TestRunner';

export default class TestSuiteRunner {

    private runner: TestRunner;
    private reporter: ResultReporter;

    public constructor(runner: TestRunner, reporter: ResultReporter) {
        this.runner = runner;
        this.reporter = reporter;
    }

    public async runSuite(suite: TestSuite): Promise<TestSuiteResults> {
        this.reporter.suiteStarted(suite);
        const tests = suite.getTests();
        const results = await this.runTests(suite, tests);
        this.reporter.suiteCompleted(suite, results, 0);
        return results;
    }

    public async runTests(suite: TestSuite, tests: Record<string, TestInfo>): Promise<TestSuiteResults> {
        const results = new TestSuiteResults(suite);
        if (tests == null || Object.keys(tests).length == 0) {
            this.reporter.testIncomplete(suite, '(no tests found)', 0);
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