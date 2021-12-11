import { Test, TestSuite } from "../../xunit";
import TestSuiteRunner from "../../src/Runners/TestSuiteRunner";
import TestRunner from "../../src/Runners/TestRunner";
import Mockito from "ts-mockito";
import ResultReporter from "../../src/Reporters/ResultReporter";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";

export default class TestSuiteRunnerTests extends TestSuite {
	@Test()
	async ReportsSuiteStarted() {
		//arrange
		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [ Mockito.instance(reporter) ]);

		//act
		await runner.runSuite(new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.suiteStarted(Mockito.anything())).once();
	}

	@Test()
	async ReportsSuiteCompleted() {
		//arrange
		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [ Mockito.instance(reporter) ]);

		//act
		await runner.runSuite(new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.suiteCompleted(Mockito.anything(), Mockito.anything())).once();
	}

	@Test()
	async ReportsIncompleteIfNoTests() {
		//arrange
		const test_runner = Mockito.mock<TestRunner>();
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [ Mockito.instance(reporter) ]);

		//act
		await runner.runTests(new class X extends TestSuite {
		}, {});

		//assert
		Mockito.verify(reporter.testIncomplete(Mockito.anything(), Mockito.anything())).once();
	}

	@Test()
	async ReturnsResultsFromTestRunner() {
		//arrange
		const test_runner = Mockito.mock<TestRunner>();
		Mockito.when(test_runner.runTest(Mockito.anything(), Mockito.anything(), Mockito.anything())).thenResolve(new TestResult(ResultType.Passed, 0));
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestSuiteRunner(Mockito.instance(test_runner), [ Mockito.instance(reporter) ]);

		//act
		const results = await runner.runTests(new class X extends TestSuite {
		}, { "test1": {}, "test2": {} });

		//assert
		this.assert.equal(2, results.count(ResultType.Passed));
	}
}