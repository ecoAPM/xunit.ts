import { AssertionError } from "node:assert";

import StringDoesNotMatch from "../../src/Assertions/StringDoesNotMatch";
import { Test, TestSuite } from "../../xunit";

export default class StringDoesNotContainTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const regex = /banana/;
		const haystack = "this is a string";

		//act
		StringDoesNotMatch(regex, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	TrueWhenHaystackIsNull() {
		//arrange
		const regex = /banana/;
		const haystack = null;

		//act
		StringDoesNotMatch(regex, haystack);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const regex = /^this/;
		const haystack = "this is a string";

		try {
			//act
			StringDoesNotMatch(regex, haystack);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}