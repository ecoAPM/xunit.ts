import { Test, TestSuite } from "../xunit";
import TestSuiteLoader from "../src/TestSuiteLoader";
import Mockito from "ts-mockito";
import FileSystem from "../src/FileSystem";

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
        const dir = 'tests';
        const filename = 'test.js';

        //act
        const path = TestSuiteLoader.getModulePath(current_dir, dir, filename);

        //assert
        this.assert.equal('../../../../../tests/test', path);
    }

    @Test()
    public async CanGetTSModulePathFromSource() {
        //arrange
        const current_dir = '.';
        const dir = 'tests';
        const filename = 'test.ts';

        //act
        const path = TestSuiteLoader.getModulePath(current_dir, dir, filename);

        //assert
        this.assert.equal('../tests/test', path);
    }

    @Test()
    public async CanLoadTestSuite() {
        //arrange
        const dir = 'tests';
        const module = 'TestSuiteLoaderTests';

        //act
        const suite = await TestSuiteLoader.loadTestSuite(dir, module);

        //assert
        this.assert.instanceOf(suite, TestSuite);
    }

    @Test()
    public async NonTestSuiteReturnsNull() {
        //arrange
        const dir = 'src';
        const module = 'TestSuiteLoader';

        //act
        const suite = await TestSuiteLoader.loadTestSuite(dir, module);

        //assert
        this.assert.isNull(suite);
    }

    @Test()
    public async CanLoadTestSuitesFiltersNonTests() {
        //arrange
        const file_system = Mockito.mock<FileSystem>();
        Mockito.when(file_system.getFiles(Mockito.anyString())).thenResolve(['TestSuiteLoaderTests', '../src/TestSuiteRunner']);
        const loader = new TestSuiteLoader(Mockito.instance(file_system));

        //act
        const suites = await loader.loadTestSuites('tests');

        //assert
        this.assert.lengthOf(suites, 1);
        this.assert.equal('TestSuiteLoaderTests', suites[0].constructor.name);
    }
}