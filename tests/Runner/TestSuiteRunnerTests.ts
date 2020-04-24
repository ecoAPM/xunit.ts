import { TestSuite, Test } from "../../xunit";
import TestSuiteRunner from "../../src/Runner/TestSuiteRunner";
import TestRunner from "../../src/Runner/TestRunner";
import Mockito from "ts-mockito";
import ResultReporter from "../../src/Runner/ResultReporter";
import { TestResult } from "../../src/Framework/TestResult";

export default class TestSuiteRunnerTests extends TestSuite {
    @Test()
    public async ReportsSuiteStarted()
    {
        //arrange
        const test_runner = Mockito.mock<TestRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestSuiteRunner(Mockito.instance(test_runner), Mockito.instance(reporter));

        //act
        await runner.runSuite(new class X extends TestSuite {});

        //assert
        Mockito.verify(reporter.suiteStarted(Mockito.anything())).once();
    }

    @Test()
    public async ReportsSuiteCompleted()
    {
        //arrange
        const test_runner = Mockito.mock<TestRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestSuiteRunner(Mockito.instance(test_runner), Mockito.instance(reporter));

        //act
        await runner.runSuite(new class X extends TestSuite {});

        //assert
        Mockito.verify(reporter.suiteCompleted(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public async ReportsIncompleteIfNoTests()
    {
        //arrange
        const test_runner = Mockito.mock<TestRunner>();
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestSuiteRunner(Mockito.instance(test_runner), Mockito.instance(reporter));

        //act
        await runner.runTests(new class X extends TestSuite {}, {});

        //assert
        Mockito.verify(reporter.testIncomplete(Mockito.anything(), Mockito.anything(), Mockito.anything())).once();
    }

    @Test()
    public async ReturnsResultsFromTestRunner()
    {
        //arrange
        const test_runner = Mockito.mock<TestRunner>();
        Mockito.when(test_runner.runTest(Mockito.anything(), Mockito.anything(), Mockito.anything())).thenResolve(TestResult.Passed);
        const reporter = Mockito.mock<ResultReporter>();
        const runner = new TestSuiteRunner(Mockito.instance(test_runner), Mockito.instance(reporter));

        //act
        const results = await runner.runTests(new class X extends TestSuite {}, {'test1': {}, 'test2': {}});

        //assert
        this.assert.equal(2, results.count(TestResult.Passed));
    }
}