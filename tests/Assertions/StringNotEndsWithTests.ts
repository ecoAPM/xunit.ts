import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringNotEndsWith from "../../src/Assertions/StringNotEndsWith";

export default class StringNotEndsWithTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const needle = 'a str';
        const haystack = 'this is a string';

        //act
        StringNotEndsWith(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async TrueWhenHaystackIsNull() {
        //arrange
        const needle = 'banana';
        const haystack = null;

        //act
        StringNotEndsWith(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const needle = 'ring';
        const haystack = 'this is a string';

        try {
            //act
            StringNotEndsWith(needle, haystack);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}