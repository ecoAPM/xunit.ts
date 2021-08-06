import fs_promises from 'fs/promises';
import path from "path";

export default class FileSystem {

    constructor(private readonly fs: typeof fs_promises) {
    }

    async getFiles(dir: string): Promise<string[]> {
        try {
            const files = [];
            const contents = await this.fs.readdir(dir);
            for (let x = 0; x < contents.length; x++) {
                const item = contents[x];
                const item_path = `${dir}${path.sep}${item}`;
                const stats = await this.fs.stat(item_path);
                files.push(...stats.isDirectory()
                    ? await this.getFiles(item_path)
                    : [item_path]);
            }
            return files;
        } catch (e) {
            return [];
        }
    }


    static extension(file: string) {
        const match = file.match(/\.(\w+)$/);
        return match != null && match.length > 1
            ? match[1]
            : '';
    }

    async save(data: string, path: string) {
        await this.fs.writeFile(path, data);
    }
}