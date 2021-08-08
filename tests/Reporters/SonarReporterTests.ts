import { Test, TestSuite } from "../../xunit";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";
import { AssertionError } from "assert";
import SonarReporter from "../../src/Reporters/SonarReporter";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";

export default class SonarReporterTests extends TestSuite {
    @Test()
    async XMLMatches() {
        //arrange
        const results1 = new TestSuiteResults(new class TestClass1 extends TestSuite { });
        results1.addResult("Test 1", new TestResult(ResultType.Passed, 1.2));
        const error = new AssertionError({
            expected: 123,
            actual: 234
        });
        results1.addResult("Test 2", new TestResult(ResultType.Failed, 2.3, error));

        const results2 = new TestSuiteResults(new class TestClass2 extends TestSuite {
        });
        results2.addResult("Test 3", new TestResult(ResultType.Passed, 3.4));
        results2.addResult("Test 4", new TestResult(ResultType.Error, 4.5, new Error('unhandled exception')));

        const fs = Mockito.mock(FileSystem);
        const reporter = new SonarReporter(Mockito.instance(fs), 'test.xml');

        //act
        const xml = reporter.xml([results1, results2]);

        //assert
        this.assert.stringStartsWith(expected_start, xml);
        this.assert.stringContains(expected_middle, xml);
        this.assert.stringEndsWith(expected_end, xml);
    }
}

const expected_start = `<testExecutions version="1">
  <file path="TestClass1">
    <testCase name="Test 1" duration="1">
    </testCase>
    <testCase name="Test 2" duration="2">
      <failure message="234 undefined 123">AssertionError [ERR_ASSERTION]: 234 undefined 123
    at new AssertionError (node:internal/assert/assertion_error:`;

const expected_middle = `)</failure>
    </testCase>
  </file>
  <file path="TestClass2">
    <testCase name="Test 3" duration="3">
    </testCase>
    <testCase name="Test 4" duration="5">
      <error message="unhandled exception">Error: unhandled exception
    at SonarReporterTests.&lt;anonymous&gt; (`;

const expected_end = `</error>
    </testCase>
  </file>
</testExecutions>`;