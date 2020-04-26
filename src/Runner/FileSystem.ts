import fs from "fs";
import path from "path";
import util from "util";

export default class FileSystem {

    private exists = util.promisify(fs.exists);
    private find = util.promisify(fs.readdir);
    private stats = util.promisify(fs.lstat);

    async getFiles(dir: string): Promise<string[]> {
        if (!await this.exists(dir))
            return [];

        const contents = await this.find(dir);
        const files = [];
        for (let x = 0; x < contents.length; x++) {
            const item = contents[x];
            const item_path = `${dir}${path.sep}${item}`;
            files.push(...(await this.stats(item_path)).isDirectory()
                ? await this.getFiles(item_path)
                : [item_path]);
        }

        return files;
    }

    static extension(file: string) {
        const match = file.match(/\.(\w+)$/);
        return match != null && match.length > 1
            ? match[1]
            : '';
    }
}