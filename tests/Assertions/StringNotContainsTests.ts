import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringNotContains from "../../src/Assertions/StringNotContains";

export default class StringNotContainsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const needle = 'banana';
        const haystack = 'this is a string';

        //act
        StringNotContains(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async TrueWhenHaystackIsNull() {
        //arrange
        const needle = 'banana';
        const haystack = null;

        //act
        StringNotContains(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const needle = 'this';
        const haystack = 'this is a string';

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