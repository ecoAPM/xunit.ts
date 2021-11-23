import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringContains from "../../src/Assertions/StringContains";

export default class StringContainsTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const needle = 'this';
        const haystack = 'this is a string';

        //act
        StringContains(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const needle = 'banana';
        const haystack = 'this is a string';

        try {
            //act
            StringContains(needle, haystack);
            throw new Error("Assertion failed");
        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async FalseWhenHaystackIsNull() {
        //arrange
        const needle = 'banana';
        const haystack = null;

        try {
            //act
            StringContains(needle, haystack);
            throw new Error("Assertion failed");
        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}