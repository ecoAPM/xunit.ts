import { Test, TestSuite } from "../../xunit";
import ResultReporter from "../../src/Runner/ResultReporter";
import TestRunner from "../../src/Runner/TestRunner";
import Mockito from 'ts-mockito';
import { TestResult } from "../../src/Framework/TestResult";

export default class TestRunnerTests extends TestSuite {
    @Test()
    public async ReturnsTestPassed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = await runner.runTest('inside reports test passed', { value: async () => { } }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Passed, result);
    }

    @Test()
    public async ReturnsTestFailed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = await runner.runTest('inside reports test failed', { value: async () => { throw new Error(); } }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Failed, result);
    }

    @Test()
    public async ReturnsTestIncomplete() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        const result = await runner.runTest('inside reports test incomplete', { }, new class X extends TestSuite { });

        //assert
        this.assert.equal(TestResult.Incomplete, result);
    }

    @Test()
    public async ReportsTestStarted() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        await runner.runTest('inside reports test started', { value: async () => { } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testStarted(Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public async ReportsTestPassed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        await runner.runTest('inside reports test passed', { value: async () => { } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testPassed(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public async ReportsTestFailed() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        await runner.runTest('inside reports test failed', { value: () => { throw new Error(); } }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testFailed(Mockito.anything(), Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public async ReportsTestIncomplete() {
        //arrange
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestRunner(Mockito.instance(reporter));

        //act
        await runner.runTest('inside reports test incomplete', { }, new class X extends TestSuite { });

        //assert
        Mockito.verify(reporter.testIncomplete(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }
}