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

    @Test()
    async CanGetExtensionFromFilename() {
        //arrange
        const filename = 'test.txt';

        //act
        const extension = FileSystem.extension(filename);

        //assert
        this.assert.equal('txt', extension);
    }

    @Test()
    async CanGetExtensionForFilenameWithMultiplePeriods() {
        //arrange
        const filename = 'test_file.final.v2.txt';

        //act
        const extension = FileSystem.extension(filename);

        //assert
        this.assert.equal('txt', extension);
    }

    @Test()
    async ExtensionIsEmptyForFilesWithoutExtension() {
        //arrange
        const filename = 'test_file';

        //act
        const extension = FileSystem.extension(filename);

        //assert
        this.assert.equal('', extension);
    }
}