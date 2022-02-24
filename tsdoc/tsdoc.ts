import Factory from "./src/Factory";
import path from "path";

Factory.TSDocGenerator()
	.run(`Assertions`, `..${path.sep}docs`)
	.catch(e => console.log(e));