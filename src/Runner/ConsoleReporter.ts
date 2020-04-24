import ResultReporter from "./ResultReporter";
import TestSuite from "../Framework/TestSuite";
import Output from "./Output";
import TestName from "../Framework/TestName";
import colors from "colors";
import { AssertionError } from "assert";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { TestResult } from "../Framework/TestResult";

export default class ConsoleReporter implements ResultReporter {

    constructor(private out: Output) { }

    runStarted(): void {
        this.out.writeLine();
    }

    suiteStarted(suite: TestSuite): void {
        this.out.writeLine(`${TestName.toSentenceCase(suite.constructor.name)}`);
    }

    testStarted(suite: TestSuite, test_name: string): void {
        this.out.write(`  ${colors.white('⋯')} ${test_name}`);
    }

    testPassed(suite: TestSuite, test_name: string): void {
        this.out.overwrite(`  ${colors.green('✓')}\n`);
    }

    testFailed(suite: TestSuite, test_name: string, error: Error): void {
        this.out.overwrite(`  ${colors.red('✘')}\n`);
        if (error instanceof AssertionError) {
            this.out.writeLine(`      Expected: ${colors.green(error.expected)}`);
            this.out.writeLine(`        Actual: ${colors.red(error.actual)}`);
        } else {
            this.out.writeLine(`  ${error.stack}`);
        }
        this.out.writeLine();
    }

    testIncomplete(suite: TestSuite, test_name: string): void {
        this.out.overwrite(`  ${colors.yellow('?')} ${test_name}\n`);
    }

    suiteCompleted(suite: TestSuite, results: TestSuiteResults): void {
        this.out.writeLine();
    }

    runCompleted(results: TestSuiteResults[]): void {
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