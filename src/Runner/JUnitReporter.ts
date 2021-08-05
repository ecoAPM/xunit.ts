import FileSystem from "./FileSystem";
import ResultReporter from './ResultReporter';
import TestSuite from '../Framework/TestSuite';
import TestSuiteResults from '../Framework/TestSuiteResults';
import xml from 'xml';
import TestName from "../Framework/TestName";
import {AssertionError} from "assert";
import {ResultType} from "../Framework/ResultType";
import TestResult from "../Framework/TestResult";

export default class JUnitReporter implements ResultReporter {
    static readonly defaultFileName: string = 'junit.xml';

    constructor(private file_system: FileSystem, private path: string) {
    }

    runStarted(): void {
    }

    suiteStarted(suite: TestSuite): void {
    }

    testStarted(suite: TestSuite, test_name: string): void {
    }

    testPassed(suite: TestSuite, test_name: string, duration: number): void {
    }

    testFailed(suite: TestSuite, test_name: string, error: AssertionError, duration: number): void {
    }

    testErrored(suite: TestSuite, test_name: string, error: Error, duration: number) {
    }

    testIncomplete(suite: TestSuite, test_name: string): void {
    }

    suiteCompleted(suite: TestSuite, results: TestSuiteResults): void {
    }

    async runCompleted(results: TestSuiteResults[]): Promise<void> {
        const xmlString = this.xml(results);
        await this.file_system.save(xmlString, this.path);
    }

    xml(results: TestSuiteResults[]) {
        const data = {
            testsuites: results.map((result, index) => JUnitReporter.testSuite(result, index))
        };
        return xml(data, {indent: '  '});
    }

    private static testSuite(results: TestSuiteResults, id: number) {
        return {
            testsuite: [
                {
                    _attr: {
                        name: TestName.toSentenceCase(results.suite.constructor.name),
                        tests: results.total(),
                        failures: results.count(ResultType.Failed),
                        errors: results.count(ResultType.Error),
                        skipped: results.count(ResultType.Incomplete),
                        time: results.time() / 1_000
                    }
                },
                ...Object.keys(results.results).map(test_name => JUnitReporter.testCase(test_name, results.suite.constructor.name, results.results[test_name]))
            ]
        };
    }

    private static testCase(test_name: string, suite_name: string, result: TestResult) {
        const testcase: object[] = [
            {
                _attr: {
                    name: test_name,
                    classname: suite_name,
                    time: result.duration / 1_000
                }
            }
        ];

        if (result.type == ResultType.Failed)
            testcase.push(JUnitReporter.failure(result));

        if (result.type == ResultType.Error)
            testcase.push(JUnitReporter.error(result));

        return {
            testcase: testcase
        };
    }

    private static failure(result: TestResult) {
        return {
            failure: {
                _attr: {
                    type: result.error?.name,
                    message: result.error?.message
                }
            }
        };
    }

    private static error(result: TestResult) {
        return {
            error: {
                _attr: {
                    type: result.error?.name,
                    message: result.error?.message
                }
            }
        };
    }
}