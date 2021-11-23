import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import NotNull from "../../src/Assertions/NotNull";

export default class NotNullTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value = 'not null';

        //act
        NotNull(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value = null;

        try {
            //act
            NotNull(value);
            throw new Error("Assertion failed");
        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}