import TestSuiteLoader from "./TestSuiteLoader";
import TestSuiteRunner from "./TestSuiteRunner";
import ResultReporter from "../Reporters/ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { ResultType } from "../Framework/ResultType";
import TestSuite from "../Framework/TestSuite";

export default class Runner {

    constructor(private readonly loader: TestSuiteLoader, private readonly runner: TestSuiteRunner, private readonly reporters: ReadonlyArray<ResultReporter>) {
    }

    async runAll(dir: string): Promise<Record<string, TestSuiteResults>> {
        await Promise.all(this.reporters.map(r => r.runStarted()));
        const suites = await this.loader.loadTestSuites(dir);
        return await this.runAndReportTestSuites(suites);
    }

    async runSelected(dir: string, filter: string): Promise<Record<string, TestSuiteResults>> {
        await Promise.all(this.reporters.map(r => r.runStarted()));
        const suites = await this.loader.loadSelectedTestSuites(dir, filter);
        const [, testName] = filter.split(".")
        return await this.runAndReportTestSuites(suites, testName);
    }

    private async runAndReportTestSuites(suites: Record<string, TestSuite>, filter?: string) {
        const results: Record<string, TestSuiteResults> = {};
        for (const file of Object.keys(suites)) {
            const suite = suites[file];
            results[file] = await (
                filter ? this.runner.runTestFromSuite(suite, filter) : this.runner.runSuite(suite)
            );
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