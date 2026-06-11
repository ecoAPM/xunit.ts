import Mockito from "ts-mockito";

import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";
import ResultReporter from "../../src/Reporters/ResultReporter";
import TestRunner from "../../src/Runners/TestRunner";
import TestSuiteRunner from "../../src/Runners/TestSuiteRunner";
import { Test, TestSuite } from "../../xunit";
import { any } from "../NonTests/MockHelpers";

export default class TestSuiteRunnerTests extends TestSuite {
	@Test()
	async ReportsSuiteStarted() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [Mockito.instance(reporter)]);

		//act
		await runner.runSuite(test_suite, []);

		//assert
		Mockito.verify(reporter.suiteStarted(any())).once();
	}

	@Test()
	async ReportsSuiteCompleted() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [Mockito.instance(reporter)]);

		//act
		await runner.runSuite(test_suite, []);

		//assert
		Mockito.verify(reporter.suiteCompleted(any(), any())).once();
	}

	@Test()
	async ReportsIncompleteIfNoTests() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [Mockito.instance(reporter)]);

		//act
		await runner.runTests(test_suite, {});

		//assert
		Mockito.verify(reporter.testIncomplete(any(), any())).once();
	}

	@Test()
	async ReturnsResultsFromTestRunner() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const test_runner = Mockito.mock<TestRunner>();
		Mockito.when(test_runner.runTest(any(), any(), any())).thenResolve(new TestResult(ResultType.Passed, 0));
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [Mockito.instance(reporter)]);

		//act
		const results = await runner.runTests(test_suite, { "test1": {}, "test2": {} });

		//assert
		this.assert.equal(2, results.count(ResultType.Passed));
	}
}