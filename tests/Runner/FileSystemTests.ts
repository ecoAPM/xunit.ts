import { Test, TestSuite } from "../../xunit";
import AsyncFileSystemModule from "../../src/Runner/AsyncFileSystemModule";
import FileSystem from "../../src/Runner/FileSystem";
import Mockito from 'ts-mockito';

export default class FileSystemTests extends TestSuite {

    @Test()
    async CanRecursivelyGetFiles() {
        //arrange
        const fs = Mockito.mock(AsyncFileSystemModule);
        Mockito.when(fs.slash).thenReturn('/');
        Mockito.when(fs.exists(Mockito.anyString())).thenResolve(true);
        Mockito.when(fs.stats(Mockito.anyString())).thenResolve({ isDirectory: () => false });
        Mockito.when(fs.find(Mockito.anyString())).thenResolve(['Test1.ts', 'Sub1/Test2.ts', 'Sub2/Test3.ts']);
        const file_system = new FileSystem(Mockito.instance(fs));

        //act
        const files = await file_system.getFiles('tests');

        //assert
        this.assert.contains(`tests/Test1.ts`, files);
        this.assert.contains(`tests/Sub1/Test2.ts`, files);
        this.assert.contains(`tests/Sub2/Test3.ts`, files);
    }

    @Test()
    async FilesAreEmptyWhenInvalidDirectory() {
        //arrange
        const fs = Mockito.mock(AsyncFileSystemModule);
        Mockito.when(fs.exists(Mockito.anyString())).thenResolve(false);
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
        const fs = Mockito.mock(AsyncFileSystemModule);
        const mock = Mockito.instance(fs);
        const file_system = new FileSystem(mock);

        //act
        file_system.save('testing, 123', 'test.txt');

        //assert
        Mockito.verify(fs.write('test.txt', 'testing, 123')).once();
    }
}