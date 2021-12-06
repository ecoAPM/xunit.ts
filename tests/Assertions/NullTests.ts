import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import Null from "../../src/Assertions/Null";

export default class NullTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const value = null;

		//act
		Null(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const value = "not null";

		try {
			//act
			Null(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}