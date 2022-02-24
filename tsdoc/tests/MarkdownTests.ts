import { Test, TestSuite } from "xunit.ts";
import Markdown from "../src/Markdown";

export default class MarkdownTests extends TestSuite {
	@Test()
	async MarkdownIsRenderedCorrectly() {
		//arrange
		const title = "Markdown Unit Test";
		const summary = "This is a test";
		const example = "this is only a test";
		const conditions = "Always";
		const params = "| p1 | v1 |\n| p2 | v2 |";

		//act
		const markdown = Markdown.render(title, summary, example, conditions, params);

		//assert
		this.assert.equal(expected, markdown);
	}
}

const expected = "---\n"
	+ "title: Markdown Unit Test \n"
	+ "---\n\n"
	+ "## Assertion: Markdown Unit Test \n\n"
	+ "This is a test \n\n"
	+ "### Example \n\n"
	+ "```ts \n"
	+ "this is only a test"
	+ "\n``` \n\n"
	+ "### Conditions \n\n"
	+ "Always \n\n"
	+ "### Parameters \n\n"
	+ "| Name | Description | \n"
	+ "|---|---| \n"
	+ "| p1 | v1 |\n"
	+ "| p2 | v2 |";