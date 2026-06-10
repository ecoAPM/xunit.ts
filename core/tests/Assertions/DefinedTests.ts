import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import Defined from "../../src/Assertions/Defined";

export default class DefinedTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const value = null;

		//act
		Defined(value);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const value = undefined;

		try {
			//act
			Defined(value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}