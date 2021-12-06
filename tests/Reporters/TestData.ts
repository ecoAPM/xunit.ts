import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { TestSuite } from "../../xunit";
import TestResult from "../../src/Framework/TestResult";
import { ResultType } from "../../src/Framework/ResultType";
import { AssertionError } from "assert";
import path from "path";

export default class TestData {
	static Results(): Record<string, TestSuiteResults> {
		const results1 = new TestSuiteResults(new class TestClass1 extends TestSuite {
		});
		results1.addResult("Test 1", new TestResult(ResultType.Passed, 1.2));
		const error = new AssertionError({
			expected: 123,
			actual: 234
		});
		results1.addResult("Test 2", new TestResult(ResultType.Failed, 2.3, error));

		const results2 = new TestSuiteResults(new class TestClass2 extends TestSuite {
		});
		results2.addResult("Test 3", new TestResult(ResultType.Incomplete, 3.4));
		results2.addResult("Test 4", new TestResult(ResultType.Error, 4.5, new Error("unhandled exception")));

		const results: Record<string, TestSuiteResults> = {};
		results[`dist${path.sep}tests${path.sep}TestClass1.js`] = results1;
		results[`dist${path.sep}tests${path.sep}TestClass2.js`] = results2;
		return results;
	}
}