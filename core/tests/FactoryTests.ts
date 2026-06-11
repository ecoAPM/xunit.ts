import Factory from "../src/Factory";
import ConsoleReporter from "../src/Reporters/ConsoleReporter";
import JUnitReporter from "../src/Reporters/JUnitReporter";
import SonarReporter from "../src/Reporters/SonarReporter";
import { Test, TestSuite } from "../xunit";

export default class FactoryTests extends TestSuite {
	@Test()
	ReportsOnlyToConsoleByDefault() {
		//arrange
		const args = {};

		//act
		const reporters = Factory.Reporters(args);

		//assert
		this.assert.count(1, reporters);
		this.assert.instanceOf(ConsoleReporter, reporters[0]);
	}

	@Test()
	QuietModeDoesNotReportToConsole() {
		//arrange
		const args = { quiet: true };

		//act
		const reporters = Factory.Reporters(args);

		//assert
		this.assert.empty(reporters);
	}

	@Test()
	CanReportToJUnitFile() {
		//arrange
		const args = { quiet: true, junit: true };

		//act
		const reporters = Factory.Reporters(args);

		//assert
		this.assert.count(1, reporters);
		this.assert.instanceOf(JUnitReporter, reporters[0]);
	}

	@Test()
	CanReportToSonarFile() {
		//arrange
		const args = { quiet: true, sonar: true };

		//act
		const reporters = Factory.Reporters(args);

		//assert
		this.assert.count(1, reporters);
		this.assert.instanceOf(SonarReporter, reporters[0]);
	}
}