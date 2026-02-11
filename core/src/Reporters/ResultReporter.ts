import TestSuite from "../Framework/TestSuite";
import { AssertionError } from "node:assert";
import TestSuiteResults from "../Framework/TestSuiteResults";

export default interface ResultReporter {
	runStarted(): Promise<void>;

	suiteStarted(suite: TestSuite): Promise<void>;

	testStarted(suite: TestSuite, test_name: string): Promise<void>;

	testPassed(suite: TestSuite, test_name: string, duration: number): Promise<void>;

	testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): Promise<void>;

	testErrored(suite: TestSuite, test_name: string, error: Error, duration: number): Promise<void>;

	testIncomplete(suite: TestSuite, test_name: string): Promise<void>;

	suiteCompleted(suite: TestSuite, results: TestSuiteResults): Promise<void>;

	runCompleted(results: Record<string, TestSuiteResults>): Promise<void>;
}