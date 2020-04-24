import { Test, TestSuite } from "../../xunit";
import TestSuiteLoader from "../../src/Runner/TestSuiteLoader";
import Mockito from "ts-mockito";
import FileSystem from "../../src/Runner/FileSystem";
import path from 'path';

export default class TestSuiteLoaderTests extends TestSuite {

    @Test()
    async IsFromNodeModulesWhenDirContainsNodeModules() {
        //arrange
        const dir = '/a/b/node_modules/x';

        //act
        const is_node_modules = TestSuiteLoader.isFromNodeModules(dir);

        //assert
        this.assert.true(is_node_modules);
    }

    @Test()
    async IsNotFromNodeModulesWhenDirDoesNotContainNodeModules() {
        //arrange
        const dir = '/a/b/c';

        //act
        const is_node_modules = TestSuiteLoader.isFromNodeModules(dir);

        //assert
        this.assert.false(is_node_modules);
    }

    @Test()
    async CanGetJSModulePathFromNodeModules() {
        //arrange
        const current_dir = 'node_modules';
        const filename = 'test.js';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    async CanGetTSModulePathFromSource() {
        //arrange
        const current_dir = '.';
        const filename = 'test.ts';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    async CanLoadTestSuite() {
        //arrange
        const module = `tests${path.sep}Runner${path.sep}TestSuiteLoaderTests`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.instanceOf(TestSuite, suite);
    }

    @Test()
    async NonTestSuiteReturnsNull() {
        //arrange
        const module = `src${path.sep}Runner${path.sep}TestSuiteLoader`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.null(suite);
    }

    @Test()
    async CanLoadTestSuitesFiltersNonTests() {
        //arrange
        const file_system = Mockito.mock<FileSystem>();
        Mockito.when(file_system.getFiles(Mockito.anyString())).thenResolve([
            `tests${path.sep}Runner${path.sep}TestSuiteLoaderTests`,
            `src${path.sep}Runner${path.sep}TestSuiteRunner`
        ]);
        const loader = new TestSuiteLoader(Mockito.instance(file_system));

        //act
        const suites = await loader.loadTestSuites('tests');

        //assert
        this.assert.count(1, suites);
        this.assert.equal('TestSuiteLoaderTests', suites[0].constructor.name);
    }
}