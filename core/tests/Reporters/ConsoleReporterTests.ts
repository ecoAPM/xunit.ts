import { Test, TestSuite } from "../../xunit";
import Mockito from "ts-mockito";
import Output from "../../src/IO/Output";
import ConsoleReporter from "../../src/Reporters/ConsoleReporter";
import { AssertionError } from "node:assert";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";
import { any } from "../NonTests/MockHelpers";

export default class ConsoleReporterTests extends TestSuite {
	@Test()
	OutputsOnRunStarted() {
		//arrange
		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.runStarted();

		//assert
		Mockito.verify(out.writeLine()).once();
	}

	@Test()
	OutputsSuiteNameOnStart() {
		//arrange
		const test_suite = new class TestSuiteName extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.suiteStarted(test_suite);

		//assert
		Mockito.verify(out.writeLine("Test Suite Name")).once();
	}

	@Test()
	OutputsTestNameOnStart() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testStarted(test_suite, "unit test name");

		//assert
		const [ output ] = Mockito.capture(out.write.bind(this)).first();
		this.assert.stringContains("unit test name", output);
	}

	@Test()
	OutputsQuestionMarkOnIncomplete() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testIncomplete(test_suite, "unit test name");

		//assert
		const [ result ] = Mockito.capture(out.overwrite.bind(this)).first();
		this.assert.stringContains("?", result);
	}

	@Test()
	OutputsCheckmarkOnPass() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testPassed(test_suite, "unit test name", 0);

		//assert
		const [ result ] = Mockito.capture(out.overwrite.bind(this)).first();
		this.assert.stringContains("✓", result);
	}

	@Test()
	OutputsXOnFailure() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testFailed(test_suite, "unit test name", new AssertionError({}), 0);

		//assert
		const [ result ] = Mockito.capture(out.overwrite.bind(this)).first();
		this.assert.stringContains("✘", result);
	}

	@Test()
	OutputsStackOnError() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testErrored(test_suite, "unit test name", new Error("unhandled exception"), 0);

		//assert
		const stack = Mockito.capture(out.writeLine.bind(this)).first();
		this.assert.stringContains("unhandled exception", stack[0] ?? "");
	}

	@Test()
	OutputsAssertionDiff() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));
		const error = new AssertionError({ message: "failed because reasons", expected: 123, actual: 234 });

		//act
		reporter.testFailed(test_suite, "unit test name", error, 0);

		//assert
		const writeLine = out.writeLine.bind(this);
		const message = Mockito.capture(writeLine).first();
		const expected = Mockito.capture(writeLine).second();
		const actual = Mockito.capture(writeLine).third();
		this.assert.stringContains("failed because reasons", message[0] ?? "");
		this.assert.stringContains("Expected:", expected[0] ?? "");
		this.assert.stringContains("123", expected[0] ?? "");
		this.assert.stringContains("Actual:", actual[0] ?? "");
		this.assert.stringContains("234", actual[0] ?? "");
	}

	@Test()
	OutputsDurationOnTestCompleted() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		//act
		reporter.testPassed(test_suite, "unit test name", 4.56);

		//assert
		Mockito.verify(out.write(" (5 ms)")).once();
	}

	@Test()
	OutputsTotalsOnSuiteCompleted() {
		//arrange
		const test_suite = new class X extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		let console = "";
		Mockito.when(out.writeLine(any())).thenCall((line: string) => console += line + "\n");

		const results = new TestSuiteResults(test_suite);
		results.addResult("test1", new TestResult(ResultType.Passed, 1.2));
		results.addResult("test2", new TestResult(ResultType.Passed, 2.3));
		results.addResult("test3", new TestResult(ResultType.Passed, 3.4));
		results.addResult("test4", new TestResult(ResultType.Failed, 4.5));
		results.addResult("test5", new TestResult(ResultType.Failed, 5.6));
		results.addResult("test6", new TestResult(ResultType.Incomplete, 6.7));

		//act
		reporter.suiteCompleted(test_suite, results);

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
		await reporter.runCompleted({});

		//assert
		Mockito.verify(out.writeLine("No tests found!")).once();
	}

	@Test()
	async OutputsResultTotals() {
		//arrange
		const test_suite = new class TestSuiteName extends TestSuite {
		};

		const out = Mockito.mock<Output>();
		const reporter = new ConsoleReporter(Mockito.instance(out));

		let console = "";
		Mockito.when(out.writeLine(any())).thenCall((line: string) => console += line + "\n");

		const results = new TestSuiteResults(test_suite);
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
		await reporter.runCompleted({ test: results });

		//assert
		this.assert.stringMatches(/Passed:.+4/, console);
		this.assert.stringMatches(/Failed:.+3/, console);
		this.assert.stringMatches(/Error:.+2/, console);
		this.assert.stringMatches(/Incomplete:.+1/, console);
		this.assert.stringMatches(/Total:.+10/, console);
	}
}