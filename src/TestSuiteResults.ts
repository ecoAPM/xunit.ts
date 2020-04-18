import TestSuite from './TestSuite';
import { TestResult } from './TestResult';

export default class TestSuiteResults {
    public readonly suite: TestSuite;
    private results: Record<string, TestResult> = {};

    public constructor(suite: TestSuite) {
        this.suite = suite;
    }

    public addResult(name: string, result: TestResult): void {
        this.results[name] = result;
    }

    public total(): number {
        return Object.values(this.results).length;
    }

    public count(result: TestResult): number {
        return Object.values(this.results).filter((r) => r === result).length;
    }
}