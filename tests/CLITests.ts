import {Test, TestSuite} from "../xunit";
import Mockito from "ts-mockito";
import Process from 'process';
import CLI from "../src/CLI";
import {WriteStream} from "tty";

export default class CLITests extends TestSuite {
    @Test()
    async ShowsHelpWhenFlagPassed() {
        //arrange
        class StdOut extends WriteStream {
            readonly fd = 1;
        }

        const process = Mockito.spy(Object.assign({}, Process));
        const out = Mockito.mock(StdOut);
        let console = '';
        Mockito.when(out.write(Mockito.anyString())).thenCall(line => console += line + '\n');
        Mockito.when(process.stdout).thenReturn(Mockito.instance(out));
        Mockito.when(process.argv).thenReturn(['xunit', '-h']);
        const cli = new CLI(Mockito.instance(process));

        //act
        await cli.run();

        //assert
        this.assert.stringContains('TypeScript unit test', console);
    }
}