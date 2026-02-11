import { Test, TestSuite } from "../../xunit";
import ResultReporter from "../../src/Reporters/ResultReporter";
import TestRunner from "../../src/Runners/TestRunner";
import Mockito from "ts-mockito";
import { ResultType } from "../../src/Framework/ResultType";
import { AssertionError } from "node:assert";

export default class TestRunnerTests extends TestSuite {
	@Test()
	async ReturnsTestPassed() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		const result = await runner.runTest("inside returns test passed", {
			value: async () => {
				await Promise.resolve();
			}
		}, new class X extends TestSuite {
		});

		//assert
		this.assert.equal(ResultType.Passed, result.type);
	}

	@Test()
	async ReturnsTestFailed() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		const result = await runner.runTest("inside returns test failed", {
			value: async () => {
				throw new AssertionError({});
			}
		}, new class X extends TestSuite {
		});

		//assert
		this.assert.equal(ResultType.Failed, result.type);
	}

	@Test()
	async ReturnsTestErrored() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		const result = await runner.runTest("inside returns test errored", {
			value: async () => {
				throw new Error();
			}
		}, new class X extends TestSuite {
		});

		//assert
		this.assert.equal(ResultType.Error, result.type);
	}

	@Test()
	async ReturnsTestIncomplete() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		const result = await runner.runTest("inside returns test incomplete", {}, new class X extends TestSuite {
		});

		//assert
		this.assert.equal(ResultType.Incomplete, result.type);
	}

	@Test()
	async ReportsTestStarted() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		await runner.runTest("inside reports test started", {
			value: async () => {
				await Promise.resolve();
			}
		}, new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.testStarted(Mockito.anything(), Mockito.anything())).once();
	}

	@Test()
	async ReportsTestPassed() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		await runner.runTest("inside reports test passed", {
			value: async () => {
				await Promise.resolve();
			}
		}, new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.testPassed(Mockito.anything(), Mockito.anyString(), Mockito.anyNumber())).once();
	}

	@Test()
	async ReportsTestFailed() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		await runner.runTest("inside reports test failed", {
			value: () => {
				throw new AssertionError({});
			}
		}, new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.testFailed(Mockito.anything(), Mockito.anyString(), Mockito.anything(), Mockito.anyNumber())).once();
	}

	@Test()
	async ReportsTestErrored() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		await runner.runTest("inside reports test errored", {
			value: () => {
				throw new Error();
			}
		}, new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.testErrored(Mockito.anything(), Mockito.anyString(), Mockito.anything(), Mockito.anyNumber())).once();
	}

	@Test()
	async ReportsTestIncomplete() {
		//arrange
		const reporter = Mockito.mock<ResultReporter>();
		const runner = new TestRunner([ Mockito.instance(reporter) ]);

		//act
		await runner.runTest("inside reports test incomplete", {}, new class X extends TestSuite {
		});

		//assert
		Mockito.verify(reporter.testIncomplete(Mockito.anything(), Mockito.anyString())).once();
	}
}