import { Test, TestSuite } from "../xunit";
import Mockito from "ts-mockito";
import Process from "process";
import CLI from "../src/CLI";
import { WriteStream } from "tty";
import Runner from "../src/Runners/Runner";

export default class CLITests extends TestSuite {
	@Test()
	async ShowsHelpWhenFlagPassed() {
		//arrange
		class StdOut extends WriteStream {
			readonly fd = 1;
		}

		const process = Mockito.spy(Object.assign({}, Process));
		const out = Mockito.mock(StdOut);
		let console = "";
		Mockito.when(out.write(Mockito.anyString())).thenCall(line => console += line + "\n");
		Mockito.when(process.stdout).thenReturn(Mockito.instance(out));
		Mockito.when(process.argv).thenReturn([ "-h" ]);
		const runner = Mockito.mock(Runner);
		const cli = new CLI(() => Mockito.instance(runner), Mockito.instance(process));

		//act
		await cli.run();

		//assert
		this.assert.stringContains("TypeScript unit test", console);
	}

	@Test()
	async ShowsMessageOnError() {
		//arrange
		class StdOut extends WriteStream {
			readonly fd = 1;
		}

		class StdErr extends WriteStream {
			readonly fd = 2;
		}

		const process = Mockito.spy(Object.assign({}, Process));
		const out = Mockito.mock(StdOut);
		const err = Mockito.mock(StdErr);
		let console = "";
		Mockito.when(out.write(Mockito.anyString())).thenCall(line => console += line + "\n");
		Mockito.when(err.write(Mockito.anyString())).thenCall(line => console += line + "\n");
		Mockito.when(process.stdout).thenReturn(Mockito.instance(out));
		Mockito.when(process.stderr).thenReturn(Mockito.instance(err));
		Mockito.when(process.argv).thenReturn([ "dist/tests" ]);
		const runner = Mockito.mock(Runner);
		Mockito.when(runner.runAll(Mockito.anyString())).thenReject(new Error("unit test"));
		const cli = new CLI(() => Mockito.instance(runner), Mockito.instance(process));

		//act
		await cli.run();

		//assert
		this.assert.stringContains("unhandled", console);
		this.assert.stringContains("unit test", console);
	}
}