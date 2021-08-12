import {Test, TestSuite} from "../../xunit";
import FileSystem from "../../src/IO/FileSystem";
import Mockito from 'ts-mockito';
import path from "path";
import fs_promises from "fs/promises";
import {Stats} from "fs";

export default class FileSystemTests extends TestSuite {

    @Test()
    async CanRecursivelyGetFiles() {
        //arrange
        const fs = Mockito.spy(Object.assign({}, fs_promises));
        const stats = Mockito.mock(Stats);
        Mockito.when(fs.stat(Mockito.anyString())).thenResolve(Mockito.instance(stats));
        Mockito.when(fs.readdir(Mockito.anyString())).thenResolve(['Test1.ts', `Sub1${path.sep}Test2.ts`, `Sub2${path.sep}Test3.ts`]);
        const file_system = new FileSystem(Mockito.instance(fs));

        //act
        const files = await file_system.getFiles('tests');

        //assert
        this.assert.contains(`tests${path.sep}Test1.ts`, files);
        this.assert.contains(`tests${path.sep}Sub1${path.sep}Test2.ts`, files);
        this.assert.contains(`tests${path.sep}Sub2${path.sep}Test3.ts`, files);
    }

    @Test()
    async FilesAreEmptyWhenInvalidDirectory() {
        //arrange
        const fs = Mockito.spy(Object.assign({}, fs_promises));
        const file_system = new FileSystem(Mockito.instance(fs));

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

    @Test()
    async SaveWritesDataToFile() {
        //arrange
        const fs = Mockito.spy(Object.assign({}, fs_promises));
        Mockito.when(fs.writeFile(Mockito.anyString(), Mockito.anyString())).thenResolve();
        const file_system = new FileSystem(Mockito.instance(fs));

        //act
        await file_system.save('testing, 123', 'test.txt');

        //assert
        Mockito.verify(fs.writeFile('test.txt', 'testing, 123')).once();
    }
}