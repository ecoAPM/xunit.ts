import { Test, TestSuite } from "../../xunit";

export default class TestDecoratorTests extends TestSuite {
    @Test()
    async TestIsAddedToSuite() {
        //arrange
        const suite = new class X extends TestSuite { };
        const test_decorator = Test('UnitTestName');

        //act
        test_decorator(suite, 'UnitTestName', {});

        //assert
        this.assert.include(Object.keys(suite.getTests()), 'UnitTestName');
    }

    @Test()
    async TakesSentenceCaseByDefault() {
        //arrange
        const suite = new class X extends TestSuite { };
        const test_decorator = Test();

        //act
        test_decorator(suite, 'UnitTestName', {});

        //assert
        this.assert.include(Object.keys(suite.getTests()), 'Unit Test Name');

    }
}