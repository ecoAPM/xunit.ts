import { Test, TestSuite } from "xunit.ts";
import Parser from "../src/Parser";
import {
	DocComment,
	DocExcerpt,
	ExcerptKind,
	ParserContext,
	TokenSequence,
	TSDocConfiguration,
	TSDocParser
} from "@microsoft/tsdoc";
import Mockito from "ts-mockito";

export default class ParserTests extends TestSuite {
	@Test()
	async CanRenderNodes() {
		//arrange
		const context = Mockito.mock(ParserContext);
		Mockito.when(context.tokens).thenReturn([]);
		const content = new TokenSequence({ parserContext: Mockito.instance(context), startIndex: 0, endIndex: 0 });
		content.toString = () => "testing, 123";

		const nodes = [
			new DocExcerpt({
				configuration: new TSDocConfiguration(),
				excerptKind: ExcerptKind.BlockTag,
				content: content
			})
		];

		//act
		const output = Parser.renderNodes(nodes);

		//assert
		this.assert.equal("testing, 123", output);
	}

	@Test()
	async CanParseDocFromTypescriptFile() {
		//arrange
		const parser = new Parser(new TSDocParser());

		//act
		const comment = await parser.findDoc(ts);

		//assert
		this.assert.instanceOf(DocComment, comment);
	}
}

const ts = `
    import module from 'module';

    /**
     * this is the TSDoc comment
     */
     export default class Classy {}
`;