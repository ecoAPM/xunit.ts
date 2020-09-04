import { TestSuite, Test } from "../../xunit";
import { AssertionError } from "assert";
import Empty from "../../src/Assertions/Empty";

export default class EmptyTests extends TestSuite {
    @Test()
    async ReturnsWhenTrueForArray() {
        //arrange
        const value: string[] = [];

        //act
        Empty(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalseForArray() {
        //arrange
        const value = [123];

        try {
            //act
            Empty(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async ReturnsWhenTrueForString() {
        //arrange
        const value = '';

        //act
        Empty(value);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalseForString() {
        //arrange
        const value = '123';

        try {
            //act
            Empty(value);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}