import { AssertionError } from "node:assert";

import Contains from "../../src/Assertions/Contains";
import { Test, TestSuite } from "../../xunit";

export default class ContainsTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const array = [ 123, 234 ];

		//act
		Contains(234, array);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const array = [ 123, 234 ];

		try {
			//act
			Contains(345, array);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}