import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import NotEmpty from "../../src/Assertions/NotEmpty";

export default class NotEmptyTests extends TestSuite {
    @Test()
    async ReturnsWhenTrueForArray() {
        //arrange
        const value = [123];

        //act
        NotEmpty(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalseForArray() {
        //arrange
        const value: string[] = [];

        try {
            //act
            NotEmpty(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async ReturnsWhenTrueForString() {
        //arrange
        const value = '123';

        //act
        NotEmpty(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalseForString() {
        //arrange
        const value = '';

        try {
            //act
            NotEmpty(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}