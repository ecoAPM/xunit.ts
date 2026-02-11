import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import StringStartsWith from "../../src/Assertions/StringStartsWith";

export default class StringStartsWithTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const needle = "this";
		const haystack = "this is a string";

		//act
		StringStartsWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const needle = "his";
		const haystack = "this is a string";

		try {
			//act
			StringStartsWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	async FalseWhenHaystackIsNull() {
		//arrange
		const needle = "banana";
		const haystack = null;

		try {
			//act
			StringStartsWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}