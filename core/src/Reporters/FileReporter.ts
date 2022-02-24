import ResultReporter from "./ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import TestSuite from "../Framework/TestSuite";
import { AssertionError } from "assert";
import FileSystem from "../IO/FileSystem";

export default abstract class FileReporter implements ResultReporter {
	/* eslint-disable @typescript-eslint/no-unused-vars */
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

	abstract runCompleted(results: Record<string, TestSuiteResults>): void;
}