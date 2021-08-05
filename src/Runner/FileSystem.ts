import AsyncFileSystemModule from "./AsyncFileSystemModule";
import path from "path";

export default class FileSystem {

    constructor(private fs: AsyncFileSystemModule) { }

    async getFiles(dir: string): Promise<string[]> {
        if (!await this.fs.exists(dir))
            return [];

        const contents = await this.fs.find(dir);
        const files = [];
        for (let x = 0; x < contents.length; x++) {
            const item = contents[x];
            const item_path = `${dir}${path.sep}${item}`;
            files.push(...(await this.fs.stats(item_path)).isDirectory()
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

    async save(data: string, path: string) {
        await this.fs.write(path, data);
    }
}