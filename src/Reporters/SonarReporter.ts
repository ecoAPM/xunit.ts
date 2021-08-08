import TestSuiteResults from '../Framework/TestSuiteResults';
import xml from 'xml';
import {ResultType} from "../Framework/ResultType";
import TestResult from "../Framework/TestResult";
import XMLReporter from "./XMLReporter";

export default class SonarReporter extends XMLReporter {
    static readonly defaultFileName: string = 'sonar.xml';

    xml(results: TestSuiteResults[]): string {
        const data = {
            testExecutions: [
                {
                    _attr: {
                        version: 1
                    }
                },
                ...results.map((result, index) => SonarReporter.testSuite(result, index))
            ]
        };
        return xml(data, {indent: '  '});
    }

    private static testSuite(results: TestSuiteResults, id: number) {
        return {
            file: [
                {
                    _attr: {
                        path: results.suite.constructor.name,
                    }
                },
                ...Object.keys(results.results)
                    .map(test_name => SonarReporter.testCase(test_name, results.results[test_name]))
            ]
        };
    }

    private static testCase(test_name: string, result: TestResult) {
        const testcase: object[] = [
            {
                _attr: {
                    name: test_name,
                    duration: Math.round(result.duration)
                }
            }
        ];

        if (result.type === ResultType.Incomplete)
            testcase.push({skipped: {}});

        if (result.type === ResultType.Failed)
            testcase.push(SonarReporter.failure(result));

        if (result.type === ResultType.Error)
            testcase.push(SonarReporter.error(result));

        return {
            testCase: testcase
        };
    }

    private static failure(result: TestResult) {
        return {
            failure: [
                {
                    _attr: {
                        message: result.error?.message
                    }
                },
                result.error?.stack
            ]
        };
    }

    private static error(result: TestResult) {
        return {
            error: [
                {
                    _attr: {
                        message: result.error?.message
                    }
                },
                result.error?.stack
            ]
        };
    }
}