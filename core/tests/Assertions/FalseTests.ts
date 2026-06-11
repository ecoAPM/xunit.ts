import { AssertionError } from "node:assert";

import False from "../../src/Assertions/False";
import { Test, TestSuite } from "../../xunit";

export default class FalseTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value = false;

		//act
		False(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value = true;

		try {
			//act
			False(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}