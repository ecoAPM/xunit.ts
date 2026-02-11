import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import StringDoesNotContain from "../../src/Assertions/StringDoesNotContain";

export default class StringDoesNotContainTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const needle = "banana";
		const haystack = "this is a string";

		//act
		StringDoesNotContain(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async TrueWhenHaystackIsNull() {
		//arrange
		const needle = "banana";
		const haystack = null;

		//act
		StringDoesNotContain(needle, haystack);

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
			StringDoesNotContain(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}