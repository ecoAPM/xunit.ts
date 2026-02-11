import { Test, TestSuite } from "../../xunit";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
import { AssertionError } from "node:assert";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import FileReporter from "../../src/Reporters/FileReporter";

class StubReporter extends FileReporter {
	runCompleted(): void {
		return;
	}
}

export default class FileReporterTests extends TestSuite {
	@Test()
	async DoesNotOutputWhileProcessing() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		const reporter = new StubReporter(Mockito.instance(fs), "test.xml");
		const suite = new class UnitTestName extends TestSuite {
		};

		//act
		reporter.runStarted();
		reporter.suiteStarted(suite);
		reporter.testStarted(suite, "test 1");
		reporter.testIncomplete(suite, "test 1");
		reporter.testPassed(suite, "test 1", 0);
		reporter.testFailed(suite, "test 1", new AssertionError({}), 0);
		reporter.testErrored(suite, "test 1", new Error(), 0);
		reporter.suiteCompleted(suite, new TestSuiteResults(suite));

		//assert
		Mockito.verify(fs.save(Mockito.anyString(), Mockito.anyString())).never();
	}
}