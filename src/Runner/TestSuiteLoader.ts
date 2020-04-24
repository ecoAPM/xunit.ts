import TestSuite from '../Framework/TestSuite';
import FileSystem from './FileSystem';
import path from 'path';

export default class TestSuiteLoader {

    private file_system: FileSystem;

    public constructor(file_system: FileSystem) {
        this.file_system = file_system;
    }

    public async loadTestSuites(dir: string): Promise<TestSuite[]> {
        const files = await this.file_system.getFiles(dir);
        const suites = [];
        for (let x = 0; x < files.length; x++) {
            const file = files[x];
            const suite = await TestSuiteLoader.loadTestSuite(file);
            if (suite != null)
                suites.push(suite);
        }
        return suites;
    }

    public static async loadTestSuite(file: string): Promise<TestSuite | null> {
        const module_path = TestSuiteLoader.getModulePath(__dirname, file);
        const test_class = await import(module_path);
        if (!(test_class.default.prototype instanceof TestSuite))
            return null;

        const tests = test_class.default.prototype.getTests();
        const suite: TestSuite = new test_class.default();
        suite.setTests(tests);
        return suite;
    }

    public static getModulePath(current_dir: string, file: string): string {
        const root = TestSuiteLoader.isFromNodeModules(path.resolve(current_dir))
            ? `..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}..`
            : `..${path.sep}..`;
        const module_name = file.replace(/\.[tj]s$/, '');
        return `${root}${path.sep}${module_name}`;
    }

    public static isFromNodeModules(dir: string): boolean {
        return dir.indexOf('node_modules') !== -1;
    }
}