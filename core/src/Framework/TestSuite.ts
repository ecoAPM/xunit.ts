import TestInfo from "./TestInfo";
import AssertionLibrary from "../Assertions";

/**
 * Defines a container of tests
 *
 * @remarks
 * Extend this class for `xunit.ts` load its tests
 *
 * @example
 * export default class CustomClassTests extends TestSuite { ... }
 */
export default abstract class TestSuite {
	assert = AssertionLibrary;

	private tests: Record<string, TestInfo> = {};

	addTest(name: string, info: TestInfo) {
		if (this.tests === undefined || this.tests === null) {
			this.tests = {};
		}
		this.tests[name] = info;
	}

	setTests(tests: Record<string, TestInfo>) {
		this.tests = tests;
	}

	getTests(filters: RegExp[]) {
		return filters.length > 0
			? this.filteredTests(filters)
			: this.tests;
	}

	filteredTests(filters: RegExp[]) {
		if (!this.tests)
			return {};

		const filtered: Record<string, TestInfo> = {};
		const keys = Object.keys(this.tests).filter(k => filters.map(f => f.test(`${this.constructor.name}.${this.tests[k].value?.name}`)).filter(m => m).length > 0);
		keys.forEach(k => {
			filtered[k] = this.tests[k];
		});
		return filtered;
	}
}