import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import Throws from "../../src/Assertions/Throws";

export default class ThrowsTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const expression = () => {
			throw new Error();
		};

		//act
		Throws(expression);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const expression = () => 5;

		try {
			//act
			Throws(expression);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}