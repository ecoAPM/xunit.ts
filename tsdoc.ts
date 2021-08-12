import Factory from "./src/Factory";
import path from "path";

Factory.TSDocGenerator()
    .run(`src${path.sep}Assertions`, 'docs')
    .catch(e => console.log(e));