import { Test, TestSuite } from "../../xunit";
import JUnitReporter from "../../src/Reporters/JUnitReporter";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
import TestData from "./TestData";

export default class JUnitReporterTests extends TestSuite {
    @Test()
    async XMLMatches() {
        //arrange
        const fs = Mockito.mock(FileSystem);
        const reporter = new JUnitReporter(Mockito.instance(fs), 'test.xml');

        //act
        const xml = reporter.xml(TestData.Results());

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
  <testsuite name="Test Class2" tests="2" failures="0" errors="1" skipped="1" time="0.0079">
    <testcase name="Test 3" classname="TestClass2" time="0.0034">
      <skipped/>
    </testcase>
    <testcase name="Test 4" classname="TestClass2" time="0.0045">
      <error type="Error" message="unhandled exception"/>
    </testcase>
  </testsuite>
</testsuites>`;