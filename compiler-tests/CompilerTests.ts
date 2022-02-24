import { Test, TestSuite } from "xunit.ts";

export default class CompilerTests extends TestSuite {
	@Test()
	async TestsAreFound() {
		//act
		const tests = this.getTests([]);

		//assert
		this.assert.count(1, Object.keys(tests));
	}
}