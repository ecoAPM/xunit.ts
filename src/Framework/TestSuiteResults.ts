import { TestResult } from './TestResult';

export default class TestSuiteResults {

    private results: Record<string, TestResult> = {};

    addResult(name: string, result: TestResult): void {
        this.results[name] = result;
    }

    total(): number {
        return Object.values(this.results).length;
    }

    count(result: TestResult): number {
        return Object.values(this.results).filter((r) => r === result).length;
    }
}