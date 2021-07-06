import { Test, TestSuite } from "../../xunit";
import Mockito from 'ts-mockito';
import Output from "../../src/Runner/Output";
import ConsoleReporter from "../../src/Runner/ConsoleReporter";
import { AssertionError } from "assert";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { TestResult } from "../../src/Framework/TestResult";

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
        reporter.suiteStarted(new class TestSuiteName extends TestSuite { });

        //assert
        Mockito.verify(out.writeLine('Test Suite Name')).once();
    }

    @Test()
    async OutputsTestNameOnStart() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testStarted(new class X extends TestSuite { }, 'unit test name');

        //assert
        const [output] = Mockito.capture(out.write).first();
        this.assert.stringContains('unit test name', output);
    }

    @Test()
    async OutputsQuestionMarkOnImcomplete() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testIncomplete(new class X extends TestSuite { }, 'unit test name');

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.stringContains('?', result);
    }

    @Test()
    async OutputsCheckmarkOnPass() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testPassed(new class X extends TestSuite { }, 'unit test name');

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.stringContains('✓', result);
    }

    @Test()
    async OutputsXOnFailure() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', new Error('unhandled exception'));

        //assert
        const [result] = Mockito.capture(out.overwrite).first();
        this.assert.stringContains('✘', result);
    }

    @Test()
    async OutputsStackOnError() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', new Error('unhandled exception'));

        //assert
        const stack = Mockito.capture(out.writeLine).first();
        this.assert.stringContains('unhandled exception', stack[0] as string);
    }

    @Test()
    async OutputsAssertionDiff() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));
        const assert = new AssertionError({message: 'failed because reasons', expected: 123, actual: 234 });

        //act
        reporter.testFailed(new class X extends TestSuite { }, 'unit test name', assert);

        //assert
        const message = Mockito.capture(out.writeLine).first();
        const expected = Mockito.capture(out.writeLine).second();
        const actual = Mockito.capture(out.writeLine).third();
        this.assert.stringContains('failed because reasons', message[0] as string);
        this.assert.stringContains('Expected:', expected[0] as string);
        this.assert.stringContains('123', expected[0] as string);
        this.assert.stringContains('Actual:', actual[0] as string);
        this.assert.stringContains('234', actual[0] as string);
    }

    @Test()
    async OutputsOnSuiteCompleted() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.suiteCompleted(new class X extends TestSuite { }, new TestSuiteResults());

        //assert
        Mockito.verify(out.writeLine()).once();
    }

    @Test()
    async OutputsWhenNoTestsRun() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        //act
        reporter.runCompleted([]);

        //assert
        Mockito.verify(out.writeLine('No tests found!')).once();
    }

    @Test()
    async OutputsResultTotals() {
        //arrange
        const out = Mockito.mock<Output>();
        const reporter = new ConsoleReporter(Mockito.instance(out));

        let console = '';
        Mockito.when(out.writeLine(Mockito.anyString())).
            thenCall((line: string) => console += line + '\n')
        
        const results = new TestSuiteResults();
        results.addResult('test1', TestResult.Passed);
        results.addResult('test2', TestResult.Passed);
        results.addResult('test3', TestResult.Passed);
        results.addResult('test4', TestResult.Failed);
        results.addResult('test5', TestResult.Failed);
        results.addResult('test6', TestResult.Incomplete);

        //act
        reporter.runCompleted([results]);

        //assert
        this.assert.stringContains('Passed', console);
        this.assert.stringContains('3', console);
        this.assert.stringContains('Failed', console);
        this.assert.stringContains('2', console);
        this.assert.stringContains('Incomplete', console);
        this.assert.stringContains('1', console);
        this.assert.stringContains('Total', console);
        this.assert.stringContains('6', console);
    }
}