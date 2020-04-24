import { Test, TestSuite } from "../xunit";
import TestName from "../src/Framework/TestName";

export default class TestNamingTests extends TestSuite {
    @Test()
    public async CanConvertTitleCaseToWords() {
        //arrange
        const title_case = 'TheseAreWords';

        //act
        const sentence = TestName.toSentenceCase(title_case);

        //assert
        this.assert.equal('These Are Words', sentence);
    }
}