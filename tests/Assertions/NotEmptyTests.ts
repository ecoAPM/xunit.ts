import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import NotEmpty from "../../src/Assertions/NotEmpty";

export default class NotEmptyTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value = [123];

        //act
        NotEmpty(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value: string[] = [];

        try {
            //act
            NotEmpty(value);
            throw new Error("Assertion failed");
        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}