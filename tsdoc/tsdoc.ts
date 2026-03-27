import Factory from "./src/Factory";
import path from "node:path";

Factory.TSDocGenerator()
	.run(`..${path.sep}core${path.sep}src${path.sep}Assertions`, `..${path.sep}docs`)
	.catch(e => console.log(e));