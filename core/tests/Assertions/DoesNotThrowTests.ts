import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "node:assert";
import DoesNotThrow from "../../src/Assertions/DoesNotThrow";

export default class DoesNotThrowTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const expression = () => 5;

		//act
		DoesNotThrow(expression);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
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