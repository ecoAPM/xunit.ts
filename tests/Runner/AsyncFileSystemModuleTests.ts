import {Test, TestSuite} from "../../xunit";
import AsyncFileSystemModule from "../../src/Runner/AsyncFileSystemModule";
import fs from "fs/promises";
import path from "path";

export default class AsyncFileSystemModuleTests extends TestSuite {
    @Test()
    async ExistsReturnsTrueWhenFileExists() {
        //arrange
        const async_fs = new AsyncFileSystemModule();

        //act
        const exists = await async_fs.exists(__filename);

        //assert
        this.assert.true(exists);
    }
    
    @Test()
    async ExistsReturnsFalseWhenFileDoesNotExist() {
        //arrange
        const async_fs = new AsyncFileSystemModule();

        //act
        const exists = await async_fs.exists('fake.txt');

        //assert
        this.assert.false(exists);
    }
    
    @Test()
    async FindGetsFilesInDirectory() {
        //arrange
        const async_fs = new AsyncFileSystemModule();

        //act
        const files = await async_fs.find(__dirname);

        //assert
        this.assert.notEmpty(files);
    }
    
    @Test()
    async CanGetStatsForFile() {
        //arrange
        const async_fs = new AsyncFileSystemModule();

        //act
        const stats = await async_fs.stats(__filename);

        //assert
        this.assert.true(stats.isFile());
    }
    
    @Test()
    async CanWriteFile() {
        //arrange
        const dir = path.join(__dirname, 'files');
        await fs.rm(dir, { force: true, recursive: true });
        await fs.mkdir(dir)
        const filename = dir + Math.random() + '.txt';
        const async_fs = new AsyncFileSystemModule();

        //act
        await async_fs.write(filename, 'test data' + filename);

        //assert
        const buffer = await fs.readFile(filename);
        this.assert.stringContains('test data' + filename, buffer.toString());
        await fs.rm(dir, { force: true, recursive: true });
    }
}