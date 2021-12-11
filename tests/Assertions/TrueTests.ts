import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import True from "../../src/Assertions/True";

export default class TrueTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const value = true;

		//act
		True(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
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