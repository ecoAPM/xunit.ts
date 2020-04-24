import TestSuite from '../Framework/TestSuite';
import { AssertionError } from 'assert';
import TestSuiteResults from '../Framework/TestSuiteResults';

export default interface ResultReporter {
    runStarted(): void;
    suiteStarted(suite: TestSuite): void;
    testStarted(suite: TestSuite, test_name: string): void;
    testPassed(suite: TestSuite, test_name: string): void;
    testFailed(suite: TestSuite, test_name: string, error: AssertionError): void;
    testIncomplete(suite: TestSuite, test_name: string): void;
    suiteCompleted(suite: TestSuite, results: TestSuiteResults): void;
    runCompleted(results: TestSuiteResults[]): void;
}