import Factory from "../src/Factory";
import { Test, TestSuite } from "xunit.ts";
import Generator from "../src/Generator";

export default class FactoryTests extends TestSuite {
	@Test()
	async CanCreateTSDocGenerator() {
		//act
		const generator = Factory.TSDocGenerator();

		//assert
		this.assert.instanceOf(Generator, generator);
	}
}