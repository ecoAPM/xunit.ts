import fs from "fs";
import util from "util";

export default class FileSystem {

    private exists: (dir: string) => Promise<boolean>;
    private find: (dir: string) => Promise<string[]>;

    public constructor() {
        this.exists = util.promisify(fs.exists);
        this.find = util.promisify(fs.readdir);
    }

    public async getFiles(dir: string): Promise<string[]> {
        return await this.exists(dir)
            ? await this.find(dir)
            : [];
    }
}