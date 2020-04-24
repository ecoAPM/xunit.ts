import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import NotContains from "../../src/Assertions/NotContains";

export default class NotContainsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const array = [123, 234];

        //act
        NotContains(345, array);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const array = [123, 234];

        try {
            //act
            NotContains(234, array);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}