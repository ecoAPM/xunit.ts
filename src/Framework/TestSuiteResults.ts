import { ResultType } from './ResultType';
import TestResult from "./TestResult";

export default class TestSuiteResults {

    private results: Record<string, TestResult> = {};

    addResult(name: string, result: TestResult) {
        this.results[name] = result;
    }

    total() {
        return Object.values(this.results).length;
    }

    count(result_type: ResultType) {
        return Object.values(this.results).filter(result => result.type === result_type).length;
    }

    time() {
        return Object.values(this.results).reduce((sum, result) => sum + result.duration, 0);
    }
}