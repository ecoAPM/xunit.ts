import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import StringDoesNotEndWith from "../../src/Assertions/StringDoesNotEndWith";

export default class StringDoesNotEndWithTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const needle = "a str";
		const haystack = "this is a string";

		//act
		StringDoesNotEndWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async TrueWhenHaystackIsNull() {
		//arrange
		const needle = "banana";
		const haystack = null;

		//act
		StringDoesNotEndWith(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const needle = "ring";
		const haystack = "this is a string";

		try {
			//act
			StringDoesNotEndWith(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	async TrueWhenNotFoundAndLengthsMatchEndCheck() {
		//arrange
		const needle = "abc";
		const haystack = "de";

		//act
		StringDoesNotEndWith(needle, haystack);

		//assert
		this.assert.true(true);
	}
}