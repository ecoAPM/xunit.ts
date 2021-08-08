import {TestSuite, Test} from "../../xunit";
import Runner from "../../src/Runners/Runner";
import TestSuiteLoader from "../../src/Runners/TestSuiteLoader";
import Mockito from 'ts-mockito';
import TestSuiteRunner from "../../src/Runners/TestSuiteRunner";
import ResultReporter from "../../src/Reporters/ResultReporter";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import {ResultType} from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";

export default class RunnerTests extends TestSuite {
    @Test()
    async ReportsRunStarted() {
        //arrange
        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve({});

        const suite_runner = Mockito.mock<TestSuiteRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new Runner(Mockito.instance(loader), Mockito.instance(suite_runner), [Mockito.instance(reporter)]);

        //act
        await runner.runAll('tests');

        //assert
        Mockito.verify(reporter.runStarted()).once();
    }

    @Test()
    async ReportsRunCompleted() {
        //arrange
        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve({});

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
        const test_suite_stub = new class X extends TestSuite {
        };

        const loader = Mockito.mock<TestSuiteLoader>();
        Mockito.when(loader.loadTestSuites(Mockito.anyString())).thenResolve({
            suite1: test_suite_stub,
            suite2: test_suite_stub
        });

        const suite_runner = Mockito.mock<TestSuiteRunner>();
        Mockito.when(suite_runner.runSuite(Mockito.anything())).thenResolve(new TestSuiteResults(test_suite_stub));

        const reporter = Mockito.mock<ResultReporter>();
        const runner = new Runner(Mockito.instance(loader), Mockito.instance(suite_runner), [Mockito.instance(reporter)]);

        //act
        const results = await runner.runAll('tests');

        //assert
        this.assert.count(2, Object.values(results));
    }

    @Test()
    async AllTestsPassedWhenNoResultsHaveLessPassedThanTotal() {
        //arrange
        const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
        });
        results.addResult('test1', new TestResult(ResultType.Passed, 0));

        //act
        const all_passed = Runner.allTestsPassed({suite: results});

        //assert
        this.assert.true(all_passed);
    }

    @Test()
    async AllTestsDidNotPassWhenSomeResultsHaveLessPassedThanTotal() {
        //arrange
        const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
        });
        results.addResult('test1', new TestResult(ResultType.Passed, 0));
        results.addResult('test2', new TestResult(ResultType.Failed, 0));

        //act
        const all_passed = Runner.allTestsPassed({suite: results});

        //assert
        this.assert.false(all_passed);
    }

    @Test()
    async AllTestsDidNotPassWhenNoTestsRun() {
        //arrange
        const results = new TestSuiteResults(new class TestSuiteName extends TestSuite {
        });

        //act
        const all_passed = Runner.allTestsPassed({suite: results});

        //assert
        this.assert.false(all_passed);
    }
}