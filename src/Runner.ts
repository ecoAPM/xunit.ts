import { TestSuite } from "../tscunit";
import TestInfo from "./TestInfo";
import { AssertionError } from "assert";
import colors from "colors";
import TestName from "./TestName";

export default class Runner {
    public async runAll(): Promise<void> {
        const suites = await this.findTestSuites('../test');
        suites.forEach((suite) => this.runSuite(suite));
    }

    public async findTestSuites(dir: string): Promise<TestSuite[]> {
        const suites: TestSuite[] = [];
        const test_class = await import('../tests/TestNamingTests');
        const tests = test_class.default.prototype.getTests();
        const suite = new test_class.default();
        suite.setTests(tests);
        suites.push(suite);
        return suites;
    }

    public runSuite(suite: TestSuite): void {
        console.log();
        console.log(TestName.toSentenceCase(suite.constructor.name));
        const tests = suite.getTests();
        const test_names = Object.keys(tests);
        test_names.forEach((name: string) => this.runTest(name, tests[name], suite));
    }

    public runTest(name: string, info: TestInfo, suite: TestSuite): void {
        try {
            if (info.value == null) {
                throw new Error(`Test "${name}" not found`);
            }

            info.value.call(suite);
            console.log('  ' + colors.green('✓') + ` ${name}`);
        } catch (error) {
            if (error.name == AssertionError.name) {
                console.error('  ' + colors.red('✘') + ` ${name}`);
            }
            else {
                console.error(error);
            }
        }
    }
}