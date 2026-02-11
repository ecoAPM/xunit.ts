import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import StringEndsWith from "../../src/Assertions/StringEndsWith";

export default class StringEndsWithTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const needle = "ring";
		const haystack = "this is a string";

		//act
		StringEndsWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const needle = "a str";
		const haystack = "this is a string";

		try {
			//act
			StringEndsWith(needle, haystack);
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
			StringEndsWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	async FalseWhenNotFoundAndLengthsMatchEndCheck() {
		//arrange
		const needle = "abc";
		const haystack = "de";

		try {
			//act
			StringEndsWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}