/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssertionError } from "node:assert";

import TestSuite from "../Framework/TestSuite";
import TestSuiteResults from "../Framework/TestSuiteResults";
import FileSystem from "../IO/FileSystem";
import ResultReporter from "./ResultReporter";

export default abstract class FileReporter implements ResultReporter {

	constructor(protected readonly file_system: FileSystem, protected readonly path: string) {
	}

	runStarted(): void {
		return;
	}

	suiteStarted(suite: TestSuite): void {
		return;
	}

	testStarted(suite: TestSuite, test_name: string): void {
		return;
	}

	testErrored(suite: TestSuite, test_name: string, error: Error, duration: number): void {
		return;
	}

	testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): void {
		return;
	}

	testIncomplete(suite: TestSuite, test_name: string): void {
		return;
	}

	testPassed(suite: TestSuite, test_name: string, duration: number): void {
		return;
	}

	suiteCompleted(suite: TestSuite, results: TestSuiteResults): void {
		return;
	}

	abstract runCompleted(results: Record<string, TestSuiteResults>): Promise<void>;
}