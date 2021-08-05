import fs from "fs";
import path from "path";
import util from "util";

export default class AsyncFileSystemModule {
    readonly slash = path.sep;

    async exists(path: string): Promise<boolean> {
        return await util.promisify(fs.exists)(path);
    }

    async find(path: string): Promise<string[]> {
        return await util.promisify(fs.readdir)(path);
    }

    async stats(path: string): Promise<any> {
        return await util.promisify(fs.lstat)(path);
    }
}