import { AssertionError } from "node:assert";

import Empty from "../../src/Assertions/Empty";
import { Test, TestSuite } from "../../xunit";

export default class EmptyTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value: string[] = [];

		//act
		Empty(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value = [ 123 ];

		try {
			//act
			Empty(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}