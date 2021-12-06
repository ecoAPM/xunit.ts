import { Test, TestSuite } from "../../xunit";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
import XMLReporter from "../../src/Reporters/XMLReporter";

class StubReporter extends XMLReporter {
	xml(): string {
		return "";
	}
}

export default class XMLReporterTests extends TestSuite {
	@Test()
	async SavesOnRunCompleted() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		const reporter = new StubReporter(Mockito.instance(fs), "test.xml");

		//act
		await reporter.runCompleted({});

		//assert
		Mockito.verify(fs.save(Mockito.anyString(), Mockito.anyString())).once();
	}
}