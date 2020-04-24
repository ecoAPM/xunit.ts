import TestSuiteLoader from './TestSuiteLoader';
import TestSuiteRunner from './TestSuiteRunner';
import ResultReporter from "./ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";

export default class Runner {

    private loader: TestSuiteLoader;
    private runner: TestSuiteRunner;
    private reporter: ResultReporter;

    public constructor(loader: TestSuiteLoader, runner: TestSuiteRunner, reporter: ResultReporter) {
        this.loader = loader;
        this.runner = runner;
        this.reporter = reporter;
    }

    public async runAll(dir: string): Promise<TestSuiteResults[]> {
        this.reporter.runStarted();
        const results: TestSuiteResults[] = [];
        const suites = await this.loader.loadTestSuites(dir);
        for (let x = 0; x < suites.length; x++) {
            const suite = suites[x];
            const result = await this.runner.runSuite(suite);
            results.push(result);
        }
        this.reporter.runCompleted(results, 0);
        return results;
    }
}