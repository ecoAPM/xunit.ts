import TestSuiteLoader from './TestSuiteLoader';
import TestSuiteRunner from './TestSuiteRunner';
import ResultReporter from "./ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { TestResult } from '../Framework/TestResult';

export default class Runner {

    constructor(private loader: TestSuiteLoader, private runner: TestSuiteRunner, private reporters: ResultReporter[]) { }

    async runAll(dir: string): Promise<TestSuiteResults[]> {
        this.reporters.forEach(r => r.runStarted());
        const results: TestSuiteResults[] = [];
        const suites = await this.loader.loadTestSuites(dir);
        for (let x = 0; x < suites.length; x++) {
            const suite = suites[x];
            const result = await this.runner.runSuite(suite);
            results.push(result);
        }
        this.reporters.forEach(r => r.runCompleted(results));
        return results;
    }

    static allTestsPassed(results: TestSuiteResults[]): boolean {
        return results.filter(result => result.total() > 0).length > 0
            && results.filter(result => result.count(TestResult.Passed) < result.total()).length === 0;
    }
}