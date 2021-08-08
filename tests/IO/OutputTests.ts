import { Test, TestSuite } from "../../xunit";
import Mockito from 'ts-mockito';
import { WriteStream } from "tty";
import Output from "../../src/IO/Output";

export default class OutputTests extends TestSuite {

    @Test()
    async CanWriteToTerminal() {
        //arrange
        const stdout = Mockito.mock<WriteStream>();
        const output = new Output(Mockito.instance(stdout));

        //act
        output.write('test');

        //assert
        Mockito.verify(stdout.write('test')).once();
    }

    @Test()
    async CanWriteNewLine() {
        //arrange
        const stdout = Mockito.mock<WriteStream>();
        const output = new Output(Mockito.instance(stdout));

        //act
        output.writeLine();

        //assert
        const received = Mockito.capture(stdout.write).first();
        this.assert.contains('\n', received);
    }

    @Test()
    async CanOverwriteLine() {
        //arrange
        const stdout = Mockito.mock<WriteStream>();
        const output = new Output(Mockito.instance(stdout));

        //act
        output.overwrite('test');

        //assert
        Mockito.verify(stdout.cursorTo(0)).once();
    }

    @Test()
    async DoesNotTryToOverwriteNonTerminal() {
        //arrange
        const stdout = Mockito.mock<WriteStream>();
        Mockito.when(stdout.isTTY).thenReturn(false);
        const output = new Output(Mockito.instance(stdout));

        //act
        output.overwriteLine('test');

        //assert
        Mockito.verify(stdout.cursorTo(0)).never();
    }
}