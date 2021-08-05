import { ResultType } from './ResultType';

export default class TestSuiteResults {

    private results: Record<string, ResultType> = {};

    addResult(name: string, result: ResultType) {
        this.results[name] = result;
    }

    total() {
        return Object.values(this.results).length;
    }

    count(result: ResultType) {
        return Object.values(this.results).filter((r) => r === result).length;
    }
}