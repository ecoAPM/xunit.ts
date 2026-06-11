import path from "node:path";

import TestSuite from "../Framework/TestSuite";
import FileSystem from "../IO/FileSystem";

export default class TestSuiteLoader {
	constructor(private readonly file_system: FileSystem) {
	}

	static async loadTestSuite(file: string, filters: RegExp[]) {
		const module_path = TestSuiteLoader.getModulePath(__dirname, file);
		const test_class = await import(module_path) as { default?: new () => TestSuite };
		const constructor = test_class.default;
		if (!constructor) {
			return null;
		}

		const prototype = constructor.prototype as TestSuite;
		if (!(prototype instanceof TestSuite)) {
			return null;
		}

		const tests = prototype.getTests(filters);
		if (tests === undefined || Object.keys(tests).length === 0) {
			return null;
		}

		const suite = new constructor();
		suite.setTests(tests);
		return suite;
	}

	static getModulePath(current_dir: string, file: string) {
		const root = TestSuiteLoader.isFromNodeModules(path.resolve(current_dir))
			? `..${path.sep}..${path.sep}..${path.sep}..${path.sep}..`
			: `..${path.sep}..${path.sep}..`;
		const extension = FileSystem.extension(file);
		const module_name = extension.length > 0
			? file.substring(0, file.length - extension.length - 1)
			: file;
		return `${root}${path.sep}${module_name}`;
	}

	static isFromNodeModules(dir: string) {
		return dir.includes("node_modules");
	}

	async loadTestSuites(dir: string, filters: RegExp[]): Promise<Record<string, TestSuite>> {
		const suites: Record<string, TestSuite> = {};

		const files = (await this.file_system.getFiles(dir))
			.filter((file) => FileSystem.extension(file) === FileSystem.extension(__filename));

		for (const file of files) {
			const suite = await TestSuiteLoader.loadTestSuite(file, filters);
			if (suite !== null) {
				suites[file] = suite;
			}
		}
		return suites;
	}
}