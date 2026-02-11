import ResultReporter from "./ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import TestSuite from "../Framework/TestSuite";
import { AssertionError } from "node:assert";
import FileSystem from "../IO/FileSystem";

export default abstract class FileReporter implements ResultReporter {
	/* eslint-disable @typescript-eslint/no-unused-vars */
	constructor(protected readonly file_system: FileSystem, protected readonly path: string) {
	}

	async runStarted(): Promise<void> {
		return;
	}

	async suiteStarted(suite: TestSuite): Promise<void> {
		return;
	}

	async testStarted(suite: TestSuite, test_name: string): Promise<void> {
		return;
	}

	async testErrored(suite: TestSuite, test_name: string, error: Error, duration: number): Promise<void> {
		return;
	}

	async testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): Promise<void> {
		return;
	}

	async testIncomplete(suite: TestSuite, test_name: string): Promise<void> {
		return;
	}

	async testPassed(suite: TestSuite, test_name: string, duration: number): Promise<void> {
		return;
	}

	async suiteCompleted(suite: TestSuite, results: TestSuiteResults): Promise<void> {
		return;
	}

	abstract runCompleted(results: Record<string, TestSuiteResults>): Promise<void>;
}