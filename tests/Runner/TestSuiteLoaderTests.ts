import { Test, TestSuite } from "../../xunit";
import TestSuiteLoader from "../../src/Runner/TestSuiteLoader";
import Mockito from "ts-mockito";
import FileSystem from "../../src/Runner/FileSystem";
import path from 'path';

export default class TestSuiteLoaderTests extends TestSuite {

    @Test()
    public async IsFromNodeModulesWhenDirContainsNodeModules() {
        //arrange
        const dir = '/a/b/node_modules/x';

        //act
        const is_node_modules = TestSuiteLoader.isFromNodeModules(dir);

        //assert
        this.assert.isTrue(is_node_modules);
    }

    @Test()
    public async IsNotFromNodeModulesWhenDirDoesNotContainNodeModules() {
        //arrange
        const dir = '/a/b/c';

        //act
        const is_node_modules = TestSuiteLoader.isFromNodeModules(dir);

        //assert
        this.assert.isFalse(is_node_modules);
    }

    @Test()
    public async CanGetJSModulePathFromNodeModules() {
        //arrange
        const current_dir = 'node_modules';
        const filename = 'test.js';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    public async CanGetTSModulePathFromSource() {
        //arrange
        const current_dir = '.';
        const filename = 'test.ts';

        //act
        const module_path = TestSuiteLoader.getModulePath(current_dir, filename);

        //assert
        this.assert.equal(`..${path.sep}..${path.sep}test`, module_path);
    }

    @Test()
    public async CanLoadTestSuite() {
        //arrange
        const module = `tests${path.sep}Runner${path.sep}TestSuiteLoaderTests`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.instanceOf(suite, TestSuite);
    }

    @Test()
    public async NonTestSuiteReturnsNull() {
        //arrange
        const module = `src${path.sep}Runner${path.sep}TestSuiteLoader`;

        //act
        const suite = await TestSuiteLoader.loadTestSuite(module);

        //assert
        this.assert.isNull(suite);
    }

    @Test()
    public async CanLoadTestSuitesFiltersNonTests() {
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
        this.assert.lengthOf(suites, 1);
        this.assert.equal('TestSuiteLoaderTests', suites[0].constructor.name);
    }
}