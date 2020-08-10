import { TestSuite, Test } from "../../xunit";
import Equal from "../../src/Assertions/Equal";
import { AssertionError } from "assert";

export default class EqualTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value1 = 123;
        const value2 = 123;

        //act
        Equal(value1, value2);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ArraysWithEqualValuesAreEqual() {
        //arrange
        const value1 = [1, 2, 3];
        const value2 = [1, 2, 3];

        //act
        Equal(value1, value2);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value1 = 123;
        const value2 = 234;

        try {
            //act
            Equal(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async ArraysWithExtraElementsAreNotEqual() {
        //arrange
        const value1 = [1, 2, 3];
        const value2 = [1, 2, 3, 4];

        try {
            //act
            Equal(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async ArraysWithMissingElementsAreNotEqual() {
        //arrange
        const value1 = [1, 2, 3, 4];
        const value2 = [1, 2, 3];

        try {
            //act
            Equal(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }

    @Test()
    async ArraysWithDifferentElementsAreNotEqual() {
        //arrange
        const value1 = [1, 2, 3];
        const value2 = [1, 2, 4];

        try {
            //act
            Equal(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}