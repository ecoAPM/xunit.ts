import { Test, TestSuite } from "../../xunit";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";

export default class TestSuiteResultsTests extends TestSuite {

	@Test()
	async CanGetPassedTests() {
		//arrange
		const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
		});
		results.addResult("test1", new TestResult(ResultType.Passed, 0));
		results.addResult("test2", new TestResult(ResultType.Passed, 0));
		results.addResult("test3", new TestResult(ResultType.Passed, 0));
		results.addResult("test4", new TestResult(ResultType.Failed, 0));
		results.addResult("test5", new TestResult(ResultType.Failed, 0));
		results.addResult("test6", new TestResult(ResultType.Incomplete, 0));

		//act
		const passed = results.count(ResultType.Passed);

		//assert
		this.assert.equal(3, passed);
	}

	@Test()
	async CanGetAllTests() {
		//arrange
		const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
		});
		results.addResult("test1", new TestResult(ResultType.Passed, 0));
		results.addResult("test2", new TestResult(ResultType.Passed, 0));
		results.addResult("test3", new TestResult(ResultType.Passed, 0));
		results.addResult("test4", new TestResult(ResultType.Failed, 0));
		results.addResult("test5", new TestResult(ResultType.Failed, 0));
		results.addResult("test6", new TestResult(ResultType.Incomplete, 0));

		//act
		const total = results.total();

		//assert
		this.assert.equal(6, total);
	}

	@Test()
	async CanGetTotalDuration() {
		//arrange
		const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
		});
		results.addResult("test1", new TestResult(ResultType.Passed, 1.2));
		results.addResult("test2", new TestResult(ResultType.Passed, 2.3));
		results.addResult("test3", new TestResult(ResultType.Passed, 3.4));
		results.addResult("test4", new TestResult(ResultType.Failed, 4.5));
		results.addResult("test5", new TestResult(ResultType.Failed, 5.6));
		results.addResult("test6", new TestResult(ResultType.Incomplete, 6.7));

		//act
		const time = results.time();

		//assert
		this.assert.equal(23.7, time);
	}
}