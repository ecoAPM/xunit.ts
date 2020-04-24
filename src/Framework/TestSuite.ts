import { assert } from 'chai';
import TestInfo from './TestInfo';

export default abstract class TestSuite {
    public assert = assert;

    private tests: Record<string, TestInfo> = {};

    public addTest(name: string, info: TestInfo): void {
        if (this.tests == null)
            this.tests = {};
        this.tests[name] = info;
    }

    public setTests(tests: Record<string, TestInfo>) {
        this.tests = tests;
    }

    public getTests() {
        return this.tests;
    }
}