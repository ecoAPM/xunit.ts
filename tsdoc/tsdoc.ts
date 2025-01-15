import Factory from "./src/Factory";
import path from "path";
import {realpath, realpathSync} from "node:fs";

Factory.TSDocGenerator()
	.run(`..${path.sep}core${path.sep}src${path.sep}Assertions`, `..${path.sep}docs`)
	.catch(e => console.log(e));