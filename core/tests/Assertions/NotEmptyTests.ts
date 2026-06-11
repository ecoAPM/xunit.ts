import { AssertionError } from "node:assert";

import NotEmpty from "../../src/Assertions/NotEmpty";
import { Test, TestSuite } from "../../xunit";

export default class NotEmptyTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value = [ 123 ];

		//act
		NotEmpty(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value: string[] = [];

		try {
			//act
			NotEmpty(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}