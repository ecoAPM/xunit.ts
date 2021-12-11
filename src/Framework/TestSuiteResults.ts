import { ResultType } from "./ResultType";
import TestResult from "./TestResult";
import TestSuite from "./TestSuite";

export default class TestSuiteResults {

	readonly results: Record<string, TestResult> = {};

	constructor(readonly suite: TestSuite) {
	}

	addResult(name: string, result: TestResult) {
		this.results[name] = result;
	}

	total() {
		return Object.values(this.results).length;
	}

	count(result_type: ResultType) {
		return Object.values(this.results).filter(result => result.type === result_type).length;
	}

	time() {
		return Object.values(this.results).reduce((sum, result) => sum + result.duration, 0);
	}
}