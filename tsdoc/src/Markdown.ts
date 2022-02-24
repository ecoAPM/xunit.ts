export default class Markdown {
	static render(title: string, summary: string, example: string, remarks: string, params: string): string {
		return "---\n"
			+ `title: ${title} \n`
			+ "---\n\n"
			+ `## Assertion: ${title} \n\n`
			+ `${summary} \n\n`
			+ (example ? "### Example \n\n" : "")
			+ (example ? "```ts \n" : "")
			+ example
			+ (example ? "\n``` \n\n" : "")
			+ (remarks ? "### Conditions \n\n" : "")
			+ (remarks ? `${remarks} \n\n` : "")
			+ (params ? "### Parameters \n\n" : "")
			+ (params ? "| Name | Description | \n" : "")
			+ (params ? "|---|---| \n" : "")
			+ params;
	}
}