import { Test, TestSuite } from "../xunit";
import ResultReporter from "../src/ResultReporter";
import TestRunner from "../src/TestRunner";
import Mockito from 'ts-mockito';
import { TestResult } from "../src/TestResult";

export default class TestRunnerTests extends TestSuite {
    @Test()
    public ReturnsTestPassed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = runner.runTest('inside reports test passed', { value: () => { } }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Passed, result);
    }

    @Test()
    public ReturnsTestFailed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = runner.runTest('inside reports test failed', { value: () => { throw new Error(); } }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Failed, result);
    }

    @Test()
    public ReturnsTestIncomplete() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = runner.runTest('inside reports test incomplete', { }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Incomplete, result);
    }

    @Test()
    public ReportsTestStarted() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        runner.runTest('inside reports test started', { value: () => { } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testStarted(Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public ReportsTestPassed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        runner.runTest('inside reports test passed', { value: () => { } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testPassed(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public ReportsTestFailed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        runner.runTest('inside reports test failed', { value: () => { throw new Error(); } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testFailed(Mockito.anything(), Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public ReportsTestIncomplete() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        runner.runTest('inside reports test incomplete', { }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testIncomplete(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }
}