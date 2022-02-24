import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import StringDoesNotStartWith from "../../src/Assertions/StringDoesNotStartWith";

export default class StringDoesNotStartWithTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const needle = "his";
		const haystack = "this is a string";

		//act
		StringDoesNotStartWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async TrueWhenHaystackIsNull() {
		//arrange
		const needle = "banana";
		const haystack = null;

		//act
		StringDoesNotStartWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const needle = "this";
		const haystack = "this is a string";

		try {
			//act
			StringDoesNotStartWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}