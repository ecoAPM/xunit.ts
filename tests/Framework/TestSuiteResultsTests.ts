import { Test, TestSuite } from "../../xunit";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";

export default class TestSuiteResultsTests extends TestSuite {

    @Test()
    async CanGetPassedTests()
    {
        //arrange
        const results = new TestSuiteResults();
        results.addResult('test1', ResultType.Passed);
        results.addResult('test2', ResultType.Passed);
        results.addResult('test3', ResultType.Passed);
        results.addResult('test4', ResultType.Failed);
        results.addResult('test5', ResultType.Failed);
        results.addResult('test6', ResultType.Incomplete);

        //act
        const passed = results.count(ResultType.Passed);

        //assert
        this.assert.equal(3, passed);
    }

    @Test()
    async CanGetAllTests()
    {
        //arrange
        const results = new TestSuiteResults();
        results.addResult('test1', ResultType.Passed);
        results.addResult('test2', ResultType.Passed);
        results.addResult('test3', ResultType.Passed);
        results.addResult('test4', ResultType.Failed);
        results.addResult('test5', ResultType.Failed);
        results.addResult('test6', ResultType.Incomplete);

        //act
        const total = results.total();

        //assert
        this.assert.equal(6, total);
    }
}