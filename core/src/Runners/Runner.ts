import { ResultType } from "../Framework/ResultType";
import TestSuiteResults from "../Framework/TestSuiteResults";
import ResultReporter from "../Reporters/ResultReporter";
import TestSuiteLoader from "./TestSuiteLoader";
import TestSuiteRunner from "./TestSuiteRunner";

export default class Runner {

	constructor(private readonly loader: TestSuiteLoader, private readonly runner: TestSuiteRunner, private readonly reporters: readonly ResultReporter[]) {
	}

	static allTestsPassed(results: Record<string, TestSuiteResults>): boolean {
		const tests_with_results = Object.values(results).filter(result => result.total() > 0);
		return tests_with_results.length > 0
			&& tests_with_results.filter(result => result.count(ResultType.Passed) < result.total()).length === 0;
	}

	async runAll(dir: string, filters: RegExp[]): Promise<Record<string, TestSuiteResults>> {
		this.reporters.map(r => r.runStarted());
		const results: Record<string, TestSuiteResults> = {};
		const suites = await this.loader.loadTestSuites(dir, filters);
		for (const file of Object.keys(suites)) {
			const suite = suites[file];
			results[file] = await this.runner.runSuite(suite, filters);
		}
		await Promise.all(this.reporters.map(r => r.runCompleted(results)));
		return results;
	}
}