import { Test, TestSuite } from "../../xunit";
import NotEqual from "../../src/Assertions/NotEqual";
import { AssertionError } from "node:assert";

export default class NotEqualTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const value1 = 123;
		const value2 = 234;

		//act
		NotEqual(value1, value2);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const value1 = 123;
		const value2 = 123;

		try {
			//act
			NotEqual(value1, value2);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}