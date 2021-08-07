import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import Defined from "../../src/Assertions/Defined";

export default class DefinedTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value = null;

        //act
        Defined(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value = undefined;

        try {
            //act
            Defined(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}