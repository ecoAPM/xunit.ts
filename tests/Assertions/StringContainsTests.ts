import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringContains from "../../src/Assertions/StringContains";

export default class StringContainsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const haystack = 'this is a string';
        const needle = 'this';

        //act
        StringContains(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const haystack = 'this is a string';
        const needle = 'banana';

        try {
            //act
            StringContains(needle, haystack);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}