import ResultReporter from "./ResultReporter";
import TestSuite from "../Framework/TestSuite";
import Output from "./Output";
import TestName from "../Framework/TestName";
import colors from "colors";
import { AssertionError } from "assert";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { TestResult } from "../Framework/TestResult";

export default class ConsoleReporter implements ResultReporter {

    private out: Output;

    public constructor(output: Output) {
        this.out = output;
    }

    public runStarted(): void {
        this.out.writeLine();
    }

    public suiteStarted(suite: TestSuite): void {
        this.out.writeLine(`${TestName.toSentenceCase(suite.constructor.name)}`);
    }

    public testStarted(suite: TestSuite, test_name: string): void {
        this.out.write(`  ${colors.white('⋯')} ${test_name}`);
    }

    public testPassed(suite: TestSuite, test_name: string, duration: number): void {
        this.out.overwrite(`  ${colors.green('✓')}\n`);
    }

    public testFailed(suite: TestSuite, test_name: string, error: Error, duration: number): void {
        this.out.overwrite(`  ${colors.red('✘')}\n`);
        if (error instanceof AssertionError) {
            this.out.writeLine(`      Expected: ${colors.green(error.expected)}`);
            this.out.writeLine(`        Actual: ${colors.red(error.actual)}`);
        } else {
            this.out.writeLine(`  ${error.stack}`);
        }
        this.out.writeLine();
    }

    public testIncomplete(suite: TestSuite, test_name: string, duration: number): void {
        this.out.overwrite(`  ${colors.yellow('?')} ${test_name}\n`);
    }

    public suiteCompleted(suite: TestSuite, results: TestSuiteResults, duration: number): void {
        this.out.writeLine();
    }

    public runCompleted(results: TestSuiteResults[], duration: number): void {
        if (!results.length) {
            this.out.writeLine('No tests found!');
            return;
        }

        const sum = (result_type?: TestResult): number => results
            .map((suite_result) => result_type !== undefined ? suite_result.count(result_type) : suite_result.total())
            .reduce((acc, current) => acc + current);

        const result = (result_type?: TestResult, color: (string: string) => string = colors.white): string => {
            const count = sum(result_type).toString();
            const pad = sum().toString().length;
            return color(count.padStart(pad));
        }

        this.out.writeLine(`    Passed: ${result(TestResult.Passed, colors.green)}`);

        if (sum(TestResult.Failed))
            this.out.writeLine(`    Failed: ${result(TestResult.Failed, colors.red)}`);

        if (sum(TestResult.Incomplete))
            this.out.writeLine(`Incomplete: ${result(TestResult.Incomplete, colors.yellow)}`);

        this.out.writeLine(`     Total: ${result(undefined, sum() === sum(TestResult.Passed) ? colors.green : undefined)}`);
    }
}