import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import Undefined from "../../src/Assertions/Undefined";

export default class UndefinedTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const value = undefined;

		//act
		Undefined(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const value = null;

		try {
			//act
			Undefined(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}