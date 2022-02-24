import { Test, TestSuite } from "../../xunit";
import SonarReporter from "../../src/Reporters/SonarReporter";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
import TestData from "./TestData";
import path from "path";

export default class SonarReporterTests extends TestSuite {
	@Test()
	async XMLMatches() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		const reporter = new SonarReporter(Mockito.instance(fs), "test.xml");

		//act
		const xml = reporter.xml(TestData.Results());

		//assert
		this.assert.stringStartsWith(expected_start, xml);
		this.assert.stringContains(expected_middle, xml);
		this.assert.stringEndsWith(expected_end, xml);
	}
}

const expected_start = `<testExecutions version="1">
	<file path="tests${path.sep}TestClass1.ts">
		<testCase name="Test 1" duration="1">
		</testCase>
		<testCase name="Test 2" duration="2">
			<failure message="234 undefined 123">AssertionError [ERR_ASSERTION]: 234 undefined 123
    at new AssertionError (node:internal/assert/assertion_error:`;

const expected_middle = `)</failure>
		</testCase>
	</file>
	<file path="tests${path.sep}TestClass2.ts">
		<testCase name="Test 3" duration="3">
			<skipped/>
		</testCase>
		<testCase name="Test 4" duration="5">
			<error message="unhandled exception">Error: unhandled exception
    at Function.Results (`;

const expected_end = `</error>
		</testCase>
	</file>
</testExecutions>`;