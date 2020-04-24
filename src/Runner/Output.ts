import { WriteStream } from "tty";

export default class Output {

    constructor(private out: WriteStream) { }

    write(data: string): void {
        this.out.write(data);
    }

    writeLine(data: string = ""): void {
        this.out.write(data + "\n");
    }

    overwrite(data: string): void {
        this.deleteLine();
        this.write(data);
    }

    overwriteLine(data: string): void {
        this.deleteLine();
        this.writeLine(data);
    }

    deleteLine(): void {
        if (this.out.isTTY)
            this.out.cursorTo(0);
    }
}