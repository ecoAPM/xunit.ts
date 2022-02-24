import { Test, TestSuite } from "../../xunit";
import Count from "../../src/Assertions/Count";
import { AssertionError } from "assert";

export default class CountTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const array = [ 123, 234 ];

		//act
		Count(2, array);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const array = [ 123, 234 ];

		try {
			//act
			Count(3, array);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}