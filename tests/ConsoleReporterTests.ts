import { Test, TestSuite } from "../xunit";
import Mockito from 'ts-mockito';
import Output from "../src/Output";
import ConsoleReporter from "../src/ConsoleReporter";
import { AssertionError } from "assert";
import TestSuiteResults from "../src/TestSuiteResults";
import { TestResult } from "../src/TestResult";

export default class ConsoleReporterTests extends TestSuite {
    @Test()
    public OutputsOnRunStarted() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.runStarted();

        //assert
        Mockito.verify(out.writeLine()).once();
    }

    @Test()
    public OutputsSuiteNameOnStart() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.suiteStarted(new class TestSuiteName extends TestSuite { });

        //assert
        Mockito.verify(out.writeLine('Test Suite Name')).once();
    }

    @Test()
    public OutputsTestNameOnStart() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testStarted(new class X extends TestSuite { }, 'unit test name');

        //assert
        const [output] = Mockito.capture(out.write).first();
        this.assert.include(output, 'unit test name');
    }

    @Test()
    public OutputsQuestionMarkOnImcomplete() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testIncomplete(new class X extends TestSuite { }, 'unit test name', 0);

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.include(result, '?');
    }

    @Test()
    public OutputsCheckmarkOnPass() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testPassed(new class X extends TestSuite { }, 'unit test name', 0);

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.include(result, '✓');
    }

    @Test()
    public OutputsXOnFailure() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', new Error('unhandled exception'), 0);

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.include(result, '✘');
    }

    @Test()
    public OutputsStackOnError() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', new Error('unhandled exception'), 0);

        //assert
        const [stack] = Mockito.capture(out.writeLine).first();
        this.assert.include(stack, 'unhandled exception');
    }

    @Test()
    public OutputsAssertionDiff() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));
        const assert = new AssertionError({ expected: '123', actual: '234' });

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', assert, 0);

        //assert
        const [expected] = Mockito.capture(out.writeLine).first();
        const [actual] = Mockito.capture(out.writeLine).second();
        this.assert.include(expected, 'Expected:');
        this.assert.include(expected, '123');
        this.assert.include(actual, 'Actual:');
        this.assert.include(actual, '234');
    }

    @Test()
    public OutputsOnSuiteCompleted() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.suiteCompleted(new class X extends TestSuite { }, new TestSuiteResults(new class X extends TestSuite { }), 0);

        //assert
        Mockito.verify(out.writeLine()).once();
    }

    @Test()
    public OutputsWhenNoTestsRun() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.runCompleted([], 0);

        //assert
        Mockito.verify(out.writeLine('No tests found!')).once();
    }

    @Test()
    public OutputsResultTotals() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        let console = '';
        Mockito.when(out.writeLine(Mockito.anyString())).
            thenCall((line: string) => console += line + '\n')
        
        const results = new TestSuiteResults(new class X extends TestSuite { });
        results.addResult('test1', TestResult.Passed);
        results.addResult('test2', TestResult.Passed);
        results.addResult('test3', TestResult.Passed);
        results.addResult('test4', TestResult.Failed);
        results.addResult('test5', TestResult.Failed);
        results.addResult('test6', TestResult.Incomplete);

        //act
        reporter.runCompleted([results], 0);

        //assert
        this.assert.include(console, 'Passed');
        this.assert.include(console, '3');
        this.assert.include(console, 'Failed');
        this.assert.include(console, '2');
        this.assert.include(console, 'Incomplete');
        this.assert.include(console, '1');
        this.assert.include(console, 'Total');
        this.assert.include(console, '6');
    }
}