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
        return Object.values(this.results).filter((r) => r.type === result_type).length;
    }
}