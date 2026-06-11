import { AssertionError } from "node:assert";

import StringContains from "../../src/Assertions/StringContains";
import { Test, TestSuite } from "../../xunit";

export default class StringContainsTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const needle = "this";
		const haystack = "this is a string";

		//act
		StringContains(needle, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const needle = "banana";
		const haystack = "this is a string";

		try {
			//act
			StringContains(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	FalseWhenHaystackIsNull() {
		//arrange
		const needle = "banana";
		const haystack = null;

		try {
			//act
			StringContains(needle, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}