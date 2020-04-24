import { Test, TestSuite } from "../../xunit";

export default class TestSuiteTests extends TestSuite {
    @Test()
    async CanAddTestsToRun() {
        //arrange
        const suite = new class X extends TestSuite { };

        //act
        suite.addTest("new test 1", {});
        suite.addTest("new test 2", {});
        const tests = suite.getTests();

        //assert
        this.assert.lengthOf(Object.keys(tests), 2);
    }

    @Test()
    async CanSetTestsToRun() {
        //arrange
        const suite = new class X extends TestSuite { };
        const tests = { "new test 1": {}, "new test 2": {} };

        //act
        suite.setTests(tests);
        const tests_to_run = suite.getTests();

        //assert
        this.assert.lengthOf(Object.keys(tests_to_run), 2);
    }

    @Test()
    async HasAssertionsBuiltIn() {
        //arrange
        const suite = new class X extends TestSuite { };

        //act
        const equal = suite.assert.equal;

        //assert
        this.assert.equal(this.assert.equal, equal);
    }
}