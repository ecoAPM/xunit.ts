import fs from "fs/promises";

export default class AsyncFileSystemModule {
    async exists(path: string): Promise<boolean> {
        try {
            await fs.stat(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    async find(path: string): Promise<string[]> {
        return await fs.readdir(path);
    }

    async stats(path: string): Promise<any> {
        return await fs.stat(path);
    }

    async write(path: string, data: string): Promise<void> {
        await fs.writeFile(path, data);
    }
}