import {DocComment, DocExcerpt, DocNode, TSDocParser} from "@microsoft/tsdoc";

export default class Parser {
    constructor(private readonly parser: TSDocParser) {
    }

    async findDoc(code: string): Promise<DocComment> {
        const comment = code.substring(code.indexOf('/**'), code.indexOf('*/') + 2);
        const context = this.parser.parseString(comment);
        return context.docComment;
    }

    private static renderNode(docNode: DocNode): string {
        let result: string = '';
        if (docNode) {
            if (docNode instanceof DocExcerpt) {
                result += docNode.content.toString();
            }
            for (const childNode of docNode.getChildNodes()) {
                result += this.renderNode(childNode);
            }
        }
        return result;
    }

    static renderNodes(docNodes: ReadonlyArray<DocNode>): string {
        let result: string = '';
        for (const docNode of docNodes) {
            result += this.renderNode(docNode);
        }
        return result.trim();
    }
}