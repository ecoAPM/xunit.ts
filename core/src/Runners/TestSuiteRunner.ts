import ResultReporter from "../Reporters/ResultReporter";
import TestSuite from "../Framework/TestSuite";
import TestSuiteResults from "../Framework/TestSuiteResults";
import TestInfo from "../Framework/TestInfo";
import TestRunner from "./TestRunner";

export default class TestSuiteRunner {

	constructor(private readonly runner: TestRunner, private readonly reporters: ReadonlyArray<ResultReporter>) {
	}

	async runSuite(suite: TestSuite, filters: RegExp[]) {
		await Promise.all(this.reporters.map(r => r.suiteStarted(suite)));
		const tests = suite.getTests(filters);
		const results = await this.runTests(suite, tests);
		await Promise.all(this.reporters.map(r => r.suiteCompleted(suite, results)));
		return results;
	}

	async runTests(suite: TestSuite, tests: Record<string, TestInfo>) {
		const results = new TestSuiteResults(suite);
		if (tests === undefined || tests === null || Object.keys(tests).length === 0) {
			await Promise.all(this.reporters.map(r => r.testIncomplete(suite, "(no tests found)")));
			return results;
		}

		const test_names = Object.keys(tests);
		for (const name of test_names) {
			const result = await this.runner.runTest(name, tests[name], suite);
			results.addResult(name, result);
		}

		return results;
	}
}