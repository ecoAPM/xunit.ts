import { Test, TestSuite } from "../../xunit";
import Generator from "../../TSDoc/Generator";
import FileSystem from "../../src/IO/FileSystem";
import Mockito from "ts-mockito";
import FSPromises from "fs/promises";
import Parser from "../../TSDoc/Parser";
import { TSDocParser } from "@microsoft/tsdoc";
import path from "path";

export default class GeneratorTests extends TestSuite {
	@Test()
	async CanGenerateFiles() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		Mockito.when(fs.getFiles(Mockito.anyString())).thenResolve([ `dist${path.sep}tests${path.sep}classy.ts` ]);
		const fs_promises = Mockito.spy(Object.assign({}, FSPromises));
		Mockito.when(fs_promises.readFile(Mockito.anyString())).thenResolve(Buffer.from(input));
		let output = "";
		Mockito.when(fs_promises.writeFile(Mockito.anyString(), Mockito.anyString())).thenCall((path, data) => output = data);
		const parser = new Parser(new TSDocParser());
		const generator = new Generator(Mockito.instance(fs), Mockito.instance(fs_promises), parser);

		//act
		await generator.run(`dist${path.sep}tests`, "docs");

		//assert
		this.assert.equal(expected, output);
	}

	@Test()
	async SkipsFileIfNoDocBlock() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		Mockito.when(fs.getFiles(Mockito.anyString())).thenResolve([ `dist${path.sep}tests${path.sep}classy.ts` ]);
		const fs_promises = Mockito.spy(Object.assign({}, FSPromises));
		Mockito.when(fs_promises.readFile(Mockito.anyString())).thenResolve(Buffer.from(""));
		const parser = new Parser(new TSDocParser());
		const generator = new Generator(Mockito.instance(fs), Mockito.instance(fs_promises), parser);

		//act
		await generator.run(`dist${path.sep}tests`, "docs");

		//assert
		Mockito.verify(fs_promises.writeFile(Mockito.anyString(), Mockito.anyString())).never();
	}

	@Test()
	async SkipsEmptySections() {
		//arrange
		const fs = Mockito.mock(FileSystem);
		Mockito.when(fs.getFiles(Mockito.anyString())).thenResolve([ `dist${path.sep}tests${path.sep}classy.ts` ]);
		const fs_promises = Mockito.spy(Object.assign({}, FSPromises));
		Mockito.when(fs_promises.readFile(Mockito.anyString())).thenResolve(Buffer.from(minimal_input));
		let output = "";
		Mockito.when(fs_promises.writeFile(Mockito.anyString(), Mockito.anyString())).thenCall((path, data) => output = data);
		const parser = new Parser(new TSDocParser());
		const generator = new Generator(Mockito.instance(fs), Mockito.instance(fs_promises), parser);

		//act
		await generator.run(`dist${path.sep}tests`, "docs");

		//assert
		this.assert.equal(minimal_expected, output);
	}
}

const input = `
    import module from 'module';

    /**
     * this is the TSDoc comment
     *
     * @remarks
     * these are the remarks
     *
     * @param p1 v1
     * @param p2 v2
     *
     * @example
     * this is the example
     */
     export default class Classy {}
`;

const expected = "---\n"
	+ "title: Classy \n"
	+ "---\n\n"
	+ "## Assertion: Classy \n\n"
	+ "this is the TSDoc comment \n\n"
	+ "### Example \n\n"
	+ "```ts \n"
	+ "this is the example"
	+ "\n``` \n\n"
	+ "### Conditions \n\n"
	+ "these are the remarks \n\n"
	+ "### Parameters \n\n"
	+ "| Name | Description | \n"
	+ "|---|---| \n"
	+ "| `p1` | v1 |\n"
	+ "| `p2` | v2 |";

const minimal_input = `
    import module from 'module';

    /**
     * this is the TSDoc comment
     */
     export default class Classy {}
`;

const minimal_expected = "---\n"
	+ "title: Classy \n"
	+ "---\n\n"
	+ "## Assertion: Classy \n\n"
	+ "this is the TSDoc comment \n\n";
