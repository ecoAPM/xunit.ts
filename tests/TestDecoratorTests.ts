import { Test, TestSuite } from "../tscunit";

export default class TestDecoratorTests extends TestSuite {
    @Test()
    public TestIsAddedToSuite() {
        //arrange
        const suite = new class X extends TestSuite { };
        const test_decorator = Test('UnitTestName');

        //act
        test_decorator(suite, 'UnitTestName', {});

        //assert
        this.assert.include(Object.keys(suite.getTests()), 'UnitTestName');
    }

    @Test()
    public TakesSentenceCaseByDefault() {
        //arrange
        const suite = new class X extends TestSuite { };
        const test_decorator = Test();

        //act
        test_decorator(suite, 'UnitTestName', {});

        //assert
        this.assert.include(Object.keys(suite.getTests()), 'Unit Test Name');

    }
}