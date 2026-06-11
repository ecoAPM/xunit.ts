import { Test, TestSuite } from "../../xunit";

export default class TestDecoratorTests extends TestSuite {
	@Test()
	TestIsAddedToSuite() {
		//arrange
		const suite = new class X extends TestSuite {
		};
		const test_decorator = Test("UnitTestName");

		//act
		test_decorator(suite, "UnitTestName", {});

		//assert
		const tests = suite.getTests([]);
		this.assert.contains("UnitTestName", Object.keys(tests ?? {}));
	}

	@Test()
	TakesSentenceCaseByDefault() {
		//arrange
		const suite = new class X extends TestSuite {
		};
		const test_decorator = Test();

		//act
		test_decorator(suite, "UnitTestName", {});

		//assert
		const tests = suite.getTests([]);
		this.assert.contains("Unit Test Name", Object.keys(tests ?? {}));

	}
}