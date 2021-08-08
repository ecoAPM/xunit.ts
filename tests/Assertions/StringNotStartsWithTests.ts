import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import StringNotStartsWith from "../../src/Assertions/StringNotStartsWith";

export default class StringNotStartsWithTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const needle = 'his';
        const haystack = 'this is a string';

        //act
        StringNotStartsWith(needle, haystack);

        //assert
        this.assert.true(true);
    }

    @Test()
    async TrueWhenHaystackIsNull() {
        //arrange
        const needle = 'banana';
        const haystack = null;

        //act
        StringNotStartsWith(needle, haystack);

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
            StringNotStartsWith(needle, haystack);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}