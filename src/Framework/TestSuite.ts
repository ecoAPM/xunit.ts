import { assert } from 'chai';
import TestInfo from './TestInfo';

export default abstract class TestSuite {
    assert = assert;

    private tests: Record<string, TestInfo> = {};

    addTest(name: string, info: TestInfo): void {
        if (this.tests == null)
            this.tests = {};
        this.tests[name] = info;
    }

    setTests(tests: Record<string, TestInfo>) {
        this.tests = tests;
    }

    getTests() {
        return this.tests;
    }
}