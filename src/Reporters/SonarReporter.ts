import TestSuiteResults from "../Framework/TestSuiteResults";
import xml from "xml";
import { ResultType } from "../Framework/ResultType";
import TestResult from "../Framework/TestResult";
import XMLReporter from "./XMLReporter";
import path from "path";

export default class SonarReporter extends XMLReporter {
	static readonly defaultFileName: string = "sonar.xml";

	private static testSuite(results: TestSuiteResults, file: string) {
		return {
			file: [
				{
					_attr: {
						path: file.substr(file.split(path.sep)[0].length + 1).replace(/\.js$/, ".ts"),
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

		const details = SonarReporter.details(result);

		if (details !== null) {
			testcase.push(details);
		}


		return {
			testCase: testcase
		};
	}

	private static details(result: TestResult): object | null {
		switch (result.type) {
		case ResultType.Incomplete:
			return { skipped: {} };
		case ResultType.Failed:
			return SonarReporter.failure(result);
		case ResultType.Error:
			return SonarReporter.error(result);
		default:
			return null;
		}
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

	xml(results: Record<string, TestSuiteResults>): string {
		const data = {
			testExecutions: [
				{
					_attr: {
						version: 1
					}
				},
				...Object.keys(results)
					.map(file => SonarReporter.testSuite(results[file], file))
			]
		};
		return xml(data, { indent: "\t" });
	}
}