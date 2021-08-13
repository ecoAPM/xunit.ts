import Factory from "./TSDoc/Factory";
import path from "path";

Factory.TSDocGenerator()
    .run(`src${path.sep}Assertions`, 'docs')
    .catch(e => console.log(e));