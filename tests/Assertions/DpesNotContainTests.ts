import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import DoesNotContain from "../../src/Assertions/DoesNotContain";

export default class DpesNotContainTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const array = [ 123, 234 ];

		//act
		DoesNotContain(345, array);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const array = [ 123, 234 ];

		try {
			//act
			DoesNotContain(234, array);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}