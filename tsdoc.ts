import FileSystem from "./src/IO/FileSystem";
import fs_promises from "fs/promises";
import {DocExcerpt, DocNode, TSDocParser} from "@microsoft/tsdoc";
import TestName from "./src/Framework/TestName";
import path from "path";

function renderDocNode(docNode: DocNode): string {
    let result: string = '';
    if (docNode) {
        if (docNode instanceof DocExcerpt) {
            result += docNode.content.toString();
        }
        for (const childNode of docNode.getChildNodes()) {
            result += renderDocNode(childNode);
        }
    }
    return result;
}

function renderDocNodes(docNodes: ReadonlyArray<DocNode>): string {
    let result: string = '';
    for (const docNode of docNodes) {
        result += renderDocNode(docNode);
    }
    return result.trim();
}

async function run(): Promise<void> {
    const parser = new TSDocParser();
    const fs = new FileSystem(fs_promises);
    const files = await fs.getFiles('src/Assertions');
    for (const file of files) {
        const buffer = await fs_promises.readFile(file);
        const code = buffer.toString();
        const comment = code.substring(code.indexOf('/**'), code.indexOf('*/') + 2);
        const context = parser.parseString(comment);
        const tsdoc = context.docComment;

        if (tsdoc.summarySection.nodes) {
            const summary = renderDocNodes(tsdoc.summarySection.nodes);
            if (summary) {
                const out = file.replace(/^src\\/, `docs${path.sep}`).replace(/^src\//, `docs${path.sep}`).replace(/\.ts$/, '.md');
                const [base, dir, filename] = out.split(path.sep);
                const title = TestName.toSentenceCase(filename?.split('.')[0] ?? '');
                const example = renderDocNodes(tsdoc.customBlocks.filter(b => b.blockTag.tagName == '@example')[0]?.content.nodes ?? []);
                const remarks = renderDocNodes(tsdoc.remarksBlock?.content.nodes ?? []);
                const md = `---\n`
                    + `title: ${title} \n`
                    + `---\n\n`
                    + `## Assertion: ${title} \n\n`
                    + `${summary} \n\n`
                    + '### Example \n\n'
                    + '```ts \n'
                    + example
                    + '\n``` \n\n'
                    + '### Conditions \n\n'
                    + `${remarks} \n\n`
                    + '### Parameters \n\n'
                    + '| Name | Description | \n'
                    + '|---|---| \n'
                    + tsdoc.params.blocks.map(p => `| \`${p.parameterName}\` | ${renderDocNodes(p.content.nodes)} |`).join('\n');
                await fs_promises.mkdir(path.join(base, dir), {recursive: true});
                await fs_promises.writeFile(out, md);
            }
        }
    }
}

run().catch(e => console.log(e));