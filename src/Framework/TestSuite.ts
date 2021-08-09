import TestInfo from './TestInfo';
import AssertionLibrary from '../Assertions';

/**
 * Defines a container of tests
 * 
 * @remarks
 * Extend this class for `xunit.ts` load its tests
 */
export default abstract class TestSuite {
    assert = AssertionLibrary;

    private tests: Record<string, TestInfo> = {};

    addTest(name: string, info: TestInfo) {
        if (this.tests === undefined || this.tests === null) {
            this.tests = {};
        }
        this.tests[name] = info;
    }

    setTests(tests: Record<string, TestInfo>) {
        this.tests = tests;
    }

    getTests() {
        return this.tests;
    }
}