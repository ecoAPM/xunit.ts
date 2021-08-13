import FileSystem from "../src/IO/FileSystem";
import FSPromises from "fs/promises";
import Parser from "./Parser";
import path from "path";
import TestName from "../src/Framework/TestName";
import Markdown from "./Markdown";
import {DocComment} from "@microsoft/tsdoc";

export default class Generator {
    constructor(private readonly fs: FileSystem, private readonly fs_promises: typeof FSPromises, private readonly parser: Parser) {
    }

    async run(dir: string, out_dir: string): Promise<void> {
        const files = await this.fs.getFiles(dir);
        const tasks = files.map(file => this.generate(file, out_dir));
        await Promise.all(tasks);
    }

    private async generate(file: string, out_path: string) {
        const code = await this.fs_promises.readFile(file);
        const doc = await this.parser.findDoc(code.toString());

        const [base, dir, filename] = file.split(path.sep);
        const md = Generator.getMarkdown(filename, doc);

        if (md !== null) {
            const out = path.join(out_path, file.substr(base.length + 1)).replace(/\.ts$/, '.md');
            await this.fs_promises.mkdir(path.join(out_path, dir), {recursive: true});
            await this.fs_promises.writeFile(out, md);
        }
    }

    private static getMarkdown(filename: string, doc: DocComment): string | null {
        const summary = Parser.renderNodes(doc.summarySection.nodes);
        if (!summary) {
            return null;
        }

        const title = TestName.toSentenceCase(filename?.split('.')[0] ?? '');
        const example = Parser.renderNodes(doc.customBlocks.filter(b => b.blockTag.tagName == '@example')[0]?.content.nodes ?? []);
        const remarks = Parser.renderNodes(doc.remarksBlock?.content.nodes ?? []);
        const params = doc.params.blocks.map(p => `| \`${p.parameterName}\` | ${Parser.renderNodes(p.content.nodes)} |`).join('\n');
        return Markdown.render(title, summary, example, remarks, params);
    }
}