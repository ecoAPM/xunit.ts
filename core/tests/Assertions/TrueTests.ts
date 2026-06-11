import { AssertionError } from "node:assert";

import True from "../../src/Assertions/True";
import { Test, TestSuite } from "../../xunit";

export default class TrueTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value = true;

		//act
		True(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value = false;

		try {
			//act
			True(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}