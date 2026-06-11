import { AssertionError } from "node:assert";

import Equal from "../../src/Assertions/Equal";
import { Test, TestSuite } from "../../xunit";

export default class EqualTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value1 = 123;
		const value2 = 123;

		//act
		Equal(value1, value2);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value1 = 123;
		const value2 = 234;

		try {
			//act
			Equal(value1, value2);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}