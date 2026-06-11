import AssertionLibrary from "../Assertions";
import TestInfo from "./TestInfo";

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

	private tests?: Record<string, TestInfo> = {};

	addTest(name: string, info: TestInfo) {
		this.tests ??= {};
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
		const tests = this.tests;
		if (tests === undefined)
			return {};

		const keys = Object.keys(tests)
			.filter(k => filters.map(f => f.test(`${this.constructor.name}.${tests[k].value?.name}`)).some(Boolean));

		const filtered: Record<string, TestInfo> = {};
		keys.forEach(k => {
			filtered[k] = tests[k];
		});

		return filtered;
	}
}