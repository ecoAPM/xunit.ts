import ResultReporter from "./ResultReporter";
import TestSuite from "../Framework/TestSuite";
import Output from "../IO/Output";
import TestName from "../Framework/TestName";
import colors from "colors";
import { AssertionError } from "node:assert";
import TestSuiteResults from "../Framework/TestSuiteResults";
import { ResultType } from "../Framework/ResultType";

export default class ConsoleReporter implements ResultReporter {

	constructor(private readonly out: Output) {
	}

	async runStarted(): Promise<void> {
		this.out.writeLine("Starting xunit.ts...");
		this.out.writeLine();
	}

	async suiteStarted(suite: TestSuite): Promise<void> {
		this.out.writeLine(TestName.toSentenceCase(suite.constructor.name));
	}

	async testStarted(suite: TestSuite, test_name: string): Promise<void> {
		this.out.write(`  ${colors.white("⋯")} ${test_name}`);
	}

	async testPassed(suite: TestSuite, test_name: string, duration: number): Promise<void> {
		this.out.write(` (${Math.round(duration)} ms)`);
		this.out.overwrite(`  ${colors.green("✓")}\n`);
	}

	async testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): Promise<void> {
		this.out.write(` (${Math.round(duration)} ms)`);
		this.out.overwrite(`  ${colors.red("✘")}\n`);
		this.out.writeLine(`      ${error.message}`);
		this.out.writeLine(`        Expected: ${colors.green(String(error.expected))}`);
		this.out.writeLine(`          Actual: ${colors.red(String(error.actual))}`);
		this.out.writeLine();
	}

	async testErrored(suite: TestSuite, test_name: string, error: Error, duration: number): Promise<void> {
		this.out.write(` (${Math.round(duration)} ms)`);
		this.out.overwrite(`  ${colors.red("✘")}\n`);
		this.out.writeLine(`  ${error.stack}`);
		this.out.writeLine();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async testIncomplete(suite: TestSuite, test_name: string): Promise<void> {
		this.out.overwrite(`  ${colors.yellow("?")}\n`);
	}

	async suiteCompleted(suite: TestSuite, results: TestSuiteResults): Promise<void> {
		const passed = results.count(ResultType.Passed);
		const total = results.total();
		const time = results.time();
		const color = passed === total ? colors.green : colors.red;
		const fraction = `${passed} / ${total}`;
		this.out.writeLine(`  ${color(fraction)} passed (${Math.round(time)} ms)`);
		this.out.writeLine();
	}

	async runCompleted(suites: Record<string, TestSuiteResults>): Promise<void> {
		const results = Object.values(suites);
		if (!results.length) {
			this.out.writeLine("No tests found!");
			return;
		}

		const sum = (result_type?: ResultType) => results
			.map((suite_result) => result_type === undefined ? suite_result.total() : suite_result.count(result_type))
			.reduce((acc, current) => acc + current, 0);

		const result = (result_type?: ResultType, color: (string: string) => string = colors.white) => {
			const count = sum(result_type).toString();
			const pad = sum().toString().length;
			return color(count.padStart(pad));
		};

		this.out.writeLine(`    Passed: ${result(ResultType.Passed, colors.green)}`);

		if (sum(ResultType.Failed)) {
			this.out.writeLine(`    Failed: ${result(ResultType.Failed, colors.red)}`);
		}

		if (sum(ResultType.Error)) {
			this.out.writeLine(`     Error: ${result(ResultType.Error, colors.red)}`);
		}

		if (sum(ResultType.Incomplete)) {
			this.out.writeLine(`Incomplete: ${result(ResultType.Incomplete, colors.yellow)}`);
		}

		this.out.writeLine(`     Total: ${result(undefined, sum() === sum(ResultType.Passed) ? colors.green : undefined)}`);
		this.out.writeLine();
	}
}