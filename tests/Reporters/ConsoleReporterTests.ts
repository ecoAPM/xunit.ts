import { Test, TestSuite } from "../../xunit";
import Mockito from "ts-mockito";
import Output from "../../src/IO/Output";
import ConsoleReporter from "../../src/Reporters/ConsoleReporter";
import { AssertionError } from "assert";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";

export default class ConsoleReporterTests extends TestSuite {
	@Test()
	async OutputsOnRunStarted() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.runStarted();

		//assert
		Mockito.verify(out.writeLine()).once();
	}

	@Test()
	async OutputsSuiteNameOnStart() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.suiteStarted(new class TestSuiteName extends TestSuite {
		});

		//assert
		Mockito.verify(out.writeLine("Test Suite Name")).once();
	}

	@Test()
	async OutputsTestNameOnStart() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testStarted(new class X extends TestSuite {
		}, "unit test name");

		//assert
		const [ output ] = Mockito.capture(out.write).first();
		this.assert.stringContains("unit test name", output);
	}

	@Test()
	async OutputsQuestionMarkOnImcomplete() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testIncomplete(new class X extends TestSuite {
		}, "unit test name");

		//assert
		const [ result ] = Mockito.capture(out.overwrite).first();
		this.assert.stringContains("?", result);
	}

	@Test()
	async OutputsCheckmarkOnPass() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testPassed(new class X extends TestSuite {
		}, "unit test name", 0);

		//assert
		const [ result ] = Mockito.capture(out.overwrite).first();
		this.assert.stringContains("✓", result);
	}

	@Test()
	async OutputsXOnFailure() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testFailed(new class X extends TestSuite {
		}, "unit test name", new AssertionError({}), 0);

		//assert
		const [ result ] = Mockito.capture(out.overwrite).first();
		this.assert.stringContains("✘", result);
	}

	@Test()
	async OutputsStackOnError() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testErrored(new class X extends TestSuite {
		}, "unit test name", new Error("unhandled exception"), 0);

		//assert
		const stack = Mockito.capture(out.writeLine).first();
		this.assert.stringContains("unhandled exception", stack[0] as string);
	}

	@Test()
	async OutputsAssertionDiff() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));
		const error = new AssertionError({ message: "failed because reasons", expected: 123, actual: 234 });

		//act
		reporter.testFailed(new class X extends TestSuite {
		}, "unit test name", error, 0);

		//assert
		const message = Mockito.capture(out.writeLine).first();
		const expected = Mockito.capture(out.writeLine).second();
		const actual = Mockito.capture(out.writeLine).third();
		this.assert.stringContains("failed because reasons", message[0] as string);
		this.assert.stringContains("Expected:", expected[0] as string);
		this.assert.stringContains("123", expected[0] as string);
		this.assert.stringContains("Actual:", actual[0] as string);
		this.assert.stringContains("234", actual[0] as string);
	}

	@Test()
	async OutputsDurationOnTestCompleted() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testPassed(new class X extends TestSuite {
		}, "unit test name", 4.56);

		//assert
		Mockito.verify(out.write(" (5 ms)")).once();
	}

	@Test()
	async OutputsTotalsOnSuiteCompleted() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		let console = "";
		Mockito.when(out.writeLine(Mockito.anyString())).thenCall((line: string) => console += line + "\n");

		const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
		});
		results.addResult("test1", new TestResult(ResultType.Passed, 1.2));
		results.addResult("test2", new TestResult(ResultType.Passed, 2.3));
		results.addResult("test3", new TestResult(ResultType.Passed, 3.4));
		results.addResult("test4", new TestResult(ResultType.Failed, 4.5));
		results.addResult("test5", new TestResult(ResultType.Failed, 5.6));
		results.addResult("test6", new TestResult(ResultType.Incomplete, 6.7));

		//act
		reporter.suiteCompleted(new class X extends TestSuite {
		}, results);

		//assert
		this.assert.stringContains("3 / 6", console);
		this.assert.stringContains("(24 ms)", console);
	}

	@Test()
	async OutputsWhenNoTestsRun() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.runCompleted({});

		//assert
		Mockito.verify(out.writeLine("No tests found!")).once();
	}

	@Test()
	async OutputsResultTotals() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		let console = "";
		Mockito.when(out.writeLine(Mockito.anyString())).thenCall((line: string) => console += line + "\n");

		const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
		});
		results.addResult("test1", new TestResult(ResultType.Passed, 0));
		results.addResult("test2", new TestResult(ResultType.Passed, 0));
		results.addResult("test3", new TestResult(ResultType.Passed, 0));
		results.addResult("test4", new TestResult(ResultType.Passed, 0));
		results.addResult("test5", new TestResult(ResultType.Failed, 0));
		results.addResult("test6", new TestResult(ResultType.Failed, 0));
		results.addResult("test7", new TestResult(ResultType.Failed, 0));
		results.addResult("test8", new TestResult(ResultType.Error, 0));
		results.addResult("test9", new TestResult(ResultType.Error, 0));
		results.addResult("test0", new TestResult(ResultType.Incomplete, 0));

		//act
		reporter.runCompleted({ test: results });

		//assert
		this.assert.stringContains("Passed", console);
		this.assert.stringContains("4", console);
		this.assert.stringContains("Failed", console);
		this.assert.stringContains("3", console);
		this.assert.stringContains("Error", console);
		this.assert.stringContains("2", console);
		this.assert.stringContains("Incomplete", console);
		this.assert.stringContains("1", console);
		this.assert.stringContains("Total", console);
		this.assert.stringContains("10", console);
	}
}