import ResultReporter from "./ResultReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";
import TestSuite from "../Framework/TestSuite";
import {AssertionError} from "assert";
import FileSystem from "../IO/FileSystem";

export default abstract class FileReporter implements ResultReporter {

    constructor(protected readonly file_system: FileSystem, protected readonly path: string) {
    }

    runStarted(): void {
    }

    suiteStarted(suite: TestSuite): void {
    }

    testStarted(suite: TestSuite, test_name: string): void {
    }

    testErrored(suite: TestSuite, test_name: string, error: Error, duration: number): void {
    }

    testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): void {
    }

    testIncomplete(suite: TestSuite, test_name: string): void {
    }

    testPassed(suite: TestSuite, test_name: string, duration: number): void {
    }

    suiteCompleted(suite: TestSuite, results: TestSuiteResults): void {
    }

    abstract runCompleted(results: TestSuiteResults[]): void;
}