import TestSuiteLoader from './TestSuiteLoader';
import TestSuiteRunner from './TestSuiteRunner';
import ResultReporter from "../Reporters/ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { ResultType } from '../Framework/ResultType';

export default class Runner {

    constructor(private readonly loader: TestSuiteLoader, private readonly runner: TestSuiteRunner, private readonly reporters: ResultReporter[]) { }

    async runAll(dir: string): Promise<TestSuiteResults[]> {
        await Promise.all(this.reporters.map(r => r.runStarted()));
        const results: TestSuiteResults[] = [];
        const suites = await this.loader.loadTestSuites(dir);
        for (let x = 0; x < suites.length; x++) {
            const suite = suites[x];
            const result = await this.runner.runSuite(suite);
            results.push(result);
        }
        await Promise.all(this.reporters.map(r => r.runCompleted(results)));
        return results;
    }

    static allTestsPassed(results: TestSuiteResults[]): boolean {
        return results.filter(result => result.total() > 0).length > 0
            && results.filter(result => result.count(ResultType.Passed) < result.total()).length === 0;
    }
}