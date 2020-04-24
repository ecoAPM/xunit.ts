import { TestSuite, Test } from "../../xunit";
import NotEqual from "../../src/Assertions/NotEqual";
import { AssertionError } from "assert";

export default class NotEqualTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value1 = 123;
        const value2 = 234;

        //act
        NotEqual(value1, value2);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value1 = 123;
        const value2 = 123;

        try {
            //act
            NotEqual(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}