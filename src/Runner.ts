import { TestSuite } from "../tscunit";
import TestInfo from "./TestInfo";
import { AssertionError } from "assert";
import colors from "colors";
import TestName from "./TestName";
import fs from "fs";
import util from "util";

export default class Runner {
    public async runAll(dir: string = './tests'): Promise<void> {
        const suites = await this.findTestSuites(dir);
        suites.forEach((suite) => this.runSuite(suite));
    }

    public async loadFiles(array: string[], callback: (file_name: string, index: Number, array: string[]) => Promise<void>) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    public async findTestSuites(dir: string): Promise<TestSuite[]> {
        const suites: TestSuite[] = [];

        try {
            const find_files = util.promisify(fs.readdir);
            const files = await find_files(dir);
            await this.loadFiles(files, async (file: string) => {
                const test_class = await import(`../${dir}/${file.replace('.ts', '')}`);
                if (!(test_class.default.prototype instanceof TestSuite)) {
                    console.log(`${file} is not a ${TestSuite.prototype.constructor.name}`);
                    return;
                }

                const tests = test_class.default.prototype.getTests();
                const suite = new test_class.default();
                suite.setTests(tests);
                suites.push(suite);
            });
        }
        catch (error) {
            console.error(error);
        }

        return suites;
    }

    public runSuite(suite: TestSuite): void {
        console.log();
        console.log(TestName.toSentenceCase(suite.constructor.name));
        const tests = suite.getTests();
        if (tests == null || tests.length == 0) {
            console.log(`  ${colors.yellow('?')} (no tests found)`);
            return;
        }

        const test_names = Object.keys(tests);
        test_names.forEach((name: string) => this.runTest(name, tests[name], suite));
    }

    public runTest(name: string, info: TestInfo, suite: TestSuite): boolean {
        try {
            if (info.value == null) {
                throw new Error(`Test "${name}" not found`);
            }

            info.value.call(suite);
            console.log(`  ${colors.green('✓')} ${name}`);
            return true;
        } catch (error) {
            if (error.name == AssertionError.name) {
                const assertion_error: AssertionError = error;
                console.error(`  ${colors.red('✘')} ${name}`);
                console.error();
                console.error(`    Expected: ${assertion_error.expected}`);
                console.error(`      Actual: ${assertion_error.actual}`);
                console.error();
            }
            else {
                console.error(error);
            }
            return false;
        }
    }
}