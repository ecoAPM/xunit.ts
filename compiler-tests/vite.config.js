import {defineConfig} from "vite";
import path from "node:path";
import fs from "node:fs";

const files = fs.readdirSync(__dirname)
	.filter(file => file.match("\\.ts$"))
	.map(file => path.resolve(__dirname, file));

export default defineConfig({
	build: {
		lib: {
			entry: "*.ts",
			formats: ["cjs"],
			fileName: "[name]"
		},
		outDir: "dist/vite",
		emptyOutDir: true,
		minify: false,
		rollupOptions: {
			input: files,
			external: ["xunit.ts"]
		},
	}
});