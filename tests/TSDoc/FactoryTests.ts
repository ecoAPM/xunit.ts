import Factory from "../../TSDoc/Factory";
import TestSuite from "../../src/Framework/TestSuite";
import { Test } from "../../xunit";
import Generator from "../../TSDoc/Generator";

export default class FactoryTests extends TestSuite {
    @Test()
    async CanCreateTSDocGenerator() {
        //act
        const generator = Factory.TSDocGenerator();
        
        //assert
        this.assert.instanceOf(Generator, generator);
    }
}