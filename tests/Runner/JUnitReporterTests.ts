import { Test, TestSuite } from "../../xunit";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import { ResultType } from "../../src/Framework/ResultType";
import TestResult from "../../src/Framework/TestResult";
import { AssertionError } from "assert";
import JUnitReporter from "../../src/Runner/JUnitReporter";
import Mockito from "ts-mockito";
import FileSystem from "../../src/Runner/FileSystem";

export default class JUnitReporterTests extends TestSuite {
    @Test()
    async DoesNotOutputWhileProcessing() {
        //arrange
        const fs = Mockito.mock(FileSystem);
        const reporter = new JUnitReporter(Mockito.instance(fs), 'test.xml');
        const suite = new class UnitTestName extends TestSuite { };

        //act
        reporter.runStarted();
        reporter.suiteStarted(suite);
        reporter.testStarted(suite, 'test 1');
        reporter.testIncomplete(suite, 'test 1');
        reporter.testPassed(suite, 'test 1', 0);
        reporter.testFailed(suite, 'test 1', new AssertionError({}), 0);
        reporter.testErrored(suite, 'test 1', new Error(), 0);
        reporter.suiteCompleted(suite, new TestSuiteResults(suite));

        //assert
        Mockito.verify(fs.save(Mockito.anyString(), Mockito.anyString())).never();
    }

    @Test()
    async SavesOnRunCompleted() {
        //arrange
        const fs = Mockito.mock(FileSystem);
        const reporter = new JUnitReporter(Mockito.instance(fs), 'test.xml');

        //act
        await reporter.runCompleted([]);

        //assert
        Mockito.verify(fs.save(Mockito.anyString(), Mockito.anyString())).once();
    }

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
        const reporter = new JUnitReporter(Mockito.instance(fs), 'test.xml');

        //act
        const xml = reporter.xml([results1, results2]);

        //assert
        this.assert.equal(expected, xml);
    }
}

const expected = `<testsuites>
  <testsuite name="Test Class1" tests="2" failures="1" errors="0" skipped="0" time="0.0035">
    <testcase name="Test 1" classname="TestClass1" time="0.0012">
    </testcase>
    <testcase name="Test 2" classname="TestClass1" time="0.0023">
      <failure type="AssertionError" message="234 undefined 123"/>
    </testcase>
  </testsuite>
  <testsuite name="Test Class2" tests="2" failures="0" errors="1" skipped="0" time="0.0079">
    <testcase name="Test 3" classname="TestClass2" time="0.0034">
    </testcase>
    <testcase name="Test 4" classname="TestClass2" time="0.0045">
      <error type="Error" message="unhandled exception"/>
    </testcase>
  </testsuite>
</testsuites>`;