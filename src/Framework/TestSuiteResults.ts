import { TestResult } from './TestResult';

export default class TestSuiteResults {

    private results: Record<string, TestResult> = {};

    addResult(name: string, result: TestResult) {
        this.results[name] = result;
    }

    total() {
        return Object.values(this.results).length;
    }

    count(result: TestResult) {
        return Object.values(this.results).filter((r) => r === result).length;
    }
}