import { Test, TestSuite } from "../xunit";
import FileSystem from "../src/Runner/FileSystem";

export default class FileSystemTests extends TestSuite {

    @Test()
    public async CanGetFiles() {
        //arrange
        const file_system = new FileSystem();

        //act
        const files = await file_system.getFiles(__dirname + '/..');

        //assert
        this.assert.include(files, 'xunit.ts');
        this.assert.include(files, 'package.json');
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