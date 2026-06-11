import { AssertionError } from "node:assert";

import NotNull from "../../src/Assertions/NotNull";
import { Test, TestSuite } from "../../xunit";

export default class NotNullTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value = "not null";

		//act
		NotNull(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value = null;

		try {
			//act
			NotNull(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}