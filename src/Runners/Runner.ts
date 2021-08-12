import TestSuiteLoader from './TestSuiteLoader';
import TestSuiteRunner from './TestSuiteRunner';
import ResultReporter from "../Reporters/ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import {ResultType} from '../Framework/ResultType';

export default class Runner {

    constructor(private readonly loader: TestSuiteLoader, private readonly runner: TestSuiteRunner, private readonly reporters: ReadonlyArray<ResultReporter>) {
    }

    async runAll(dir: string): Promise<Record<string, TestSuiteResults>> {
        await Promise.all(this.reporters.map(r => r.runStarted()));
        const results: Record<string, TestSuiteResults> = {};
        const suites = await this.loader.loadTestSuites(dir);
        for (const file of Object.keys(suites)) {
            const suite = suites[file];
            results[file] = await this.runner.runSuite(suite);
        }
        await Promise.all(this.reporters.map(r => r.runCompleted(results)));
        return results;
    }

    static allTestsPassed(results: Record<string, TestSuiteResults>): boolean {
        const tests_with_results = Object.values(results).filter(result => result.total() > 0);
        return tests_with_results.length > 0
            && tests_with_results.filter(result => result.count(ResultType.Passed) < result.total()).length === 0;
    }
}