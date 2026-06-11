import { AssertionError } from "node:assert";

import DoesNotThrow from "../../src/Assertions/DoesNotThrow";
import { Test, TestSuite } from "../../xunit";

export default class DoesNotThrowTests extends TestSuite {
	@Test()
	ReturnsWhenTrue() {
		//arrange
		const expression = () => 5;

		//act
		DoesNotThrow(expression);

		//assert
		this.assert.true(true);
	}

	@Test()
	ThrowsWhenFalse() {
		//arrange
		const expression = () => {
			throw new Error();
		};

		try {
			//act
			DoesNotThrow(expression);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}
}