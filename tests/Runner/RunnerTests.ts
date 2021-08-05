import { TestSuite, Test } from "../../xunit";
import Runner from "../../src/Runner/Runner";
import TestSuiteLoader from "../../src/Runner/TestSuiteLoader";
import Mockito from 'ts-mockito';
import TestSuiteRunner from "../../src/Runner/TestSuiteRunner";
import ResultReporter from "../../src/Runner/ResultReporter";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";

export default class RunnerTests extends TestSuite {
    @Test()
    async ReportsRunStarted() {
        //arrange
        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve([]);

        const suite_runner = Mockito.mock<TestSuiteRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new Runner(Mockito.instance(loader), Mockito.instance(suite_runner), [Mockito.instance(reporter)]);

        //act
        await runner.runAll('tests');

        //assert
        Mockito.verify(reporter.runStarted());
    }

    @Test()
    async ReportsRunCompleted() {
        //arrange
        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve([]);

        const suite_runner = Mockito.mock<TestSuiteRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new Runner(Mockito.instance(loader), Mockito.instance(suite_runner), [Mockito.instance(reporter)]);

        //act
        await runner.runAll('tests');

        //assert
        Mockito.verify(reporter.runCompleted(Mockito.anything()));
    }

    @Test()
    async ReturnsTestSuiteResults() {
        //arrange
        const test_suite_stub = new class X extends TestSuite { };

        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve([test_suite_stub, test_suite_stub]);

        const suite_runner = Mockito.mock<TestSuiteRunner>();
        Mockito.when(suite_runner.runSuite(Mockito.anything())).thenResolve(new TestSuiteResults());

        const reporter = Mockito.mock<ResultReporter>();
        const runner = new Runner(Mockito.instance(loader), Mockito.instance(suite_runner), [Mockito.instance(reporter)]);

        //act
        const results = await runner.runAll('tests');

        //assert
        this.assert.count(2, results);
    }

    @Test()
    async AllTestsPassedWhenNoResultsHaveLessPassedThanTotal() {
        //arrange
        const results = new TestSuiteResults();
        results.addResult('test1', ResultType.Passed);

        //act
        const all_passed = Runner.allTestsPassed([results]);

        //assert
        this.assert.true(all_passed);
    }

    @Test()
    async AllTestsDidNotPassWhenSomeResultsHaveLessPassedThanTotal() {
        //arrange
        const results = new TestSuiteResults();
        results.addResult('test1', ResultType.Passed);
        results.addResult('test2', ResultType.Failed);

        //act
        const all_passed = Runner.allTestsPassed([results]);

        //assert
        this.assert.false(all_passed);
    }

    @Test()
    async AllTestsDidNotPassWhenNoTestsRun() {
        //arrange
        const results = new TestSuiteResults();

        //act
        const all_passed = Runner.allTestsPassed([results]);

        //assert
        this.assert.false(all_passed);
    }
}