import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import Throws from "../../src/Assertions/Throws";

export default class ThrowsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const expression = () => { throw new Error(); }

        //act
        Throws(expression);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const expression = () => 5;

        try {
            //act
            Throws(expression);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}