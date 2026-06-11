import { AssertionError } from "node:assert";

import StringMatches from "../../src/Assertions/StringMatches";
import { Test, TestSuite } from "../../xunit";

export default class StringContainsTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const regex = /^this/;
		const haystack = "this is a string";

		//act
		StringMatches(regex, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const regex = /banana/;
		const haystack = "this is a string";

		try {
			//act
			StringMatches(regex, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	FalseWhenHaystackIsNull() {
		//arrange
		const regex = /banana/;
		const haystack = null;

		try {
			//act
			StringMatches(regex, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}