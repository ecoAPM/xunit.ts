import { WriteStream } from "tty";

export default class Output {

    constructor(private out: WriteStream) { }

    write(data: string) {
        this.out.write(data);
    }

    writeLine(data: string = "") {
        this.out.write(data + "\n");
    }

    overwrite(data: string) {
        this.deleteLine();
        this.write(data);
    }

    overwriteLine(data: string) {
        this.deleteLine();
        this.writeLine(data);
    }

    deleteLine() {
        if (this.out.isTTY)
            this.out.cursorTo(0);
    }
}