import typescript from "@rollup/plugin-typescript";
import path from "path";
import fs from "fs";

const files = fs.readdirSync(__dirname)
	.filter(file => file.match("\\.ts$"))
	.map(file => path.resolve(__dirname, file));

export default {
	input: files,
	output: {
		dir: "dist/legacy-rollup2"
	},
	plugins: [typescript({
		outDir: "dist/legacy-rollup2"
	})],
	external: ["xunit.ts"]
};