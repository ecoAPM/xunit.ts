import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import False from "../../src/Assertions/False";

export default class FalseTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value = false;

        //act
        False(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value = true;

        try {
            //act
            False(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}