import { Test, TestSuite } from "../../xunit";

export default class TestDecoratorTests extends TestSuite {
	@Test()
	async TestIsAddedToSuite() {
		//arrange
		const suite = new class X extends TestSuite {
		};
		const test_decorator = Test("UnitTestName");

		//act
		test_decorator(suite, "UnitTestName", {});

		//assert
		this.assert.contains("UnitTestName", Object.keys(suite.getTests()));
	}

	@Test()
	async TakesSentenceCaseByDefault() {
		//arrange
		const suite = new class X extends TestSuite {
		};
		const test_decorator = Test();

		//act
		test_decorator(suite, "UnitTestName", {});

		//assert
		this.assert.contains("Unit Test Name", Object.keys(suite.getTests()));

	}
}