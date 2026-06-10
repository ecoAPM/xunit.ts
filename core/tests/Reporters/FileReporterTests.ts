import { Test, TestSuite } from "../../xunit";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
import { AssertionError } from "node:assert";
import TestSuiteResults from "../../src/Framework/TestSuiteResults";
import FileReporter from "../../src/Reporters/FileReporter";

class StubReporter extends FileReporter {
	async runCompleted(): Promise<void> {
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
		await reporter.runStarted();
		await reporter.suiteStarted(suite);
		await reporter.testStarted(suite, "test 1");
		await reporter.testIncomplete(suite, "test 1");
		await reporter.testPassed(suite, "test 1", 0);
		await reporter.testFailed(suite, "test 1", new AssertionError({}), 0);
		await reporter.testErrored(suite, "test 1", new Error(), 0);
		await reporter.suiteCompleted(suite, new TestSuiteResults(suite));

		//assert
		Mockito.verify(fs.save(Mockito.anyString(), Mockito.anyString())).never();
	}
}