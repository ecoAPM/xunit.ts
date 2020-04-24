import { WriteStream } from "tty";

export default class Output {

    private out: WriteStream;

    public constructor(stdout: WriteStream) {
        this.out = stdout;
    }

    public write(data: string): void {
        this.out.write(data);
    }

    public writeLine(data: string = ""): void {
        this.out.write(data + "\n");
    }

    public overwrite(data: string): void {
        this.deleteLine();
        this.write(data);
    }

    public overwriteLine(data: string): void {
        this.deleteLine();
        this.writeLine(data);
    }

    public deleteLine(): void {
        if (this.out.isTTY)
            this.out.cursorTo(0);
    }
}