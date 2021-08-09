import TestSuiteResults from '../Framework/TestSuiteResults';
import xml from 'xml';
import TestName from "../Framework/TestName";
import {ResultType} from "../Framework/ResultType";
import TestResult from "../Framework/TestResult";
import XMLReporter from "./XMLReporter";

export default class JUnitReporter extends XMLReporter {
    static readonly defaultFileName: string = 'junit.xml';

    xml(results: Record<string, TestSuiteResults>): string {
        const data = {
            testsuites: Object.values(results).map((result, index) => JUnitReporter.testSuite(result, index))
        };
        return xml(data, {indent: '  '});
    }

    private static testSuite(results: TestSuiteResults, id: number) {
        return {
            testsuite: [
                {
                    _attr: {
                        id: id,
                        name: TestName.toSentenceCase(results.suite.constructor.name),
                        tests: results.total(),
                        failures: results.count(ResultType.Failed),
                        errors: results.count(ResultType.Error),
                        skipped: results.count(ResultType.Incomplete),
                        time: results.time() / 1_000
                    }
                },
                ...Object.keys(results.results)
                    .map(test_name => JUnitReporter.testCase(test_name, results.suite.constructor.name, results.results[test_name]))
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

        const details = JUnitReporter.details(result);

        if (details !== null) {
            testcase.push(details);
        }
        
        return {
            testcase: testcase
        };
    }

    private static details(result: TestResult): object|null {
        switch(result.type) {
            case ResultType.Incomplete:
                return {skipped: {}};
            case ResultType.Failed:
                return JUnitReporter.failure(result);
            case ResultType.Error:
                return JUnitReporter.error(result);
            default:
                return null;
        }
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