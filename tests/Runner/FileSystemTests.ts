import { Test, TestSuite } from "../../xunit";
import FileSystem from "../../src/Runner/FileSystem";
import path from 'path';

export default class FileSystemTests extends TestSuite {

    @Test()
    public async CanRecursivelyGetFiles() {
        //arrange
        const file_system = new FileSystem();

        //act
        const files = await file_system.getFiles('tests');

        //assert
        this.assert.include(files, `tests${path.sep}Runner${path.sep}FileSystemTests.ts`);
        this.assert.include(files, `tests${path.sep}Framework${path.sep}TestSuiteTests.ts`);
    }

    @Test()
    public async FilesAreEmptyWhenInvalidDirectory() {
        //arrange
        const file_system = new FileSystem();

        //act
        const files = await file_system.getFiles('nonexistent');

        //assert
        this.assert.isEmpty(files);
    }
}