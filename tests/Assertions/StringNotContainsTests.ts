import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringNotContains from "../../src/Assertions/StringNotContains";

export default class StringNotContainsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const haystack = 'this is a string';
        const needle = 'banana';

        //act
        StringNotContains(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const haystack = 'this is a string';
        const needle = 'this';

        try {
            //act
            StringNotContains(needle, haystack);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}