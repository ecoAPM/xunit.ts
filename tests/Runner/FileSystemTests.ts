import { Test, TestSuite } from "../../xunit";
import FileSystem from "../../src/Runner/FileSystem";
import path from 'path';

export default class FileSystemTests extends TestSuite {

    @Test()
    async CanRecursivelyGetFiles() {
        //arrange
        const file_system = new FileSystem();

        //act
        const files = await file_system.getFiles('tests');

        //assert
        this.assert.contains(`tests${path.sep}Runner${path.sep}FileSystemTests.ts`, files);
        this.assert.contains(`tests${path.sep}Framework${path.sep}TestSuiteTests.ts`, files);
    }

    @Test()
    async FilesAreEmptyWhenInvalidDirectory() {
        //arrange
        const file_system = new FileSystem();

        //act
        const files = await file_system.getFiles('nonexistent');

        //assert
        this.assert.empty(files);
    }
}