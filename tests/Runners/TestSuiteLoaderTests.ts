import { Test, TestSuite } from "../../xunit";
import TestSuiteLoader from "../../src/Runners/TestSuiteLoader";
import Mockito from "ts-mockito";
import FileSystem from "../../src/IO/FileSystem";
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
    async CanGetModulePathFromNodeModules() {
        //arrange
        const current_dir = 'node_modules';
        const filename = 'test.js';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    async CanGetModulePathFromSource() {
        //arrange
        const current_dir = '.';
        const filename = 'test.ts';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    async CanLoadTestSuite() {
        //arrange
        const module = `dist${path.sep}tests${path.sep}Runners${path.sep}TestSuiteLoaderTests`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.instanceOf(TestSuite, suite);
    }

    @Test()
    async NonTestSuiteReturnsNull() {
        //arrange
        const module = `dist${path.sep}src${path.sep}Runners${path.sep}TestSuiteLoader`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.null(suite);
    }

    @Test()
    async LoadTestSuitesFiltersNonTests() {
        //arrange
        const file_system = Mockito.mock<FileSystem>();
        Mockito.when(file_system.getFiles(Mockito.anyString())).thenResolve([
            `dist${path.sep}tests${path.sep}Runners${path.sep}TestSuiteLoaderTests.js`,
            `dist${path.sep}tests${path.sep}Runners${path.sep}data.csv`,
            `dist${path.sep}src${path.sep}Runners${path.sep}TestSuiteRunner.js`
        ]);
        const loader = new TestSuiteLoader(Mockito.instance(file_system));

        //act
        const suites = await loader.loadTestSuites('tests');

        //assert
        const values = Object.values(suites);
        this.assert.count(1, values);
        this.assert.equal('TestSuiteLoaderTests', values[0].constructor.name);
    }
}