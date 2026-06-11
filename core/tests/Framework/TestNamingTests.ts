import TestName from "../../src/Framework/TestName";
import { Test, TestSuite } from "../../xunit";

export default class TestNamingTests extends TestSuite {
	@Test()
	CanConvertTitleCaseToWords() {
		//arrange
		const title_case = "TheseAreWords";

		//act
		const sentence = TestName.toSentenceCase(title_case);

		//assert
		this.assert.equal("These Are Words", sentence);
	}

	@Test()
	CanConvertSnakeCaseToWords() {
		//arrange
		const title_case = "_this_is_a_snake";

		//act
		const sentence = TestName.toSentenceCase(title_case);

		//assert
		this.assert.equal("This Is A Snake", sentence);
	}
}