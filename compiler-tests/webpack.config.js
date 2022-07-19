const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(__dirname)
	.filter(file => file.match("\\.ts$"))
	.map(file => path.resolve(__dirname, file));

module.exports = {
	mode: "production",
	stats: 'errors-warnings',
	entry: files,
	output: {
		path: path.resolve(__dirname, "dist/webpack"),
		filename: "[name].js",
		library: {
			type: "commonjs"
		}
	},
	optimization: {
		minimize: false
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts'],
	},
	target: "node",
	externals: ["xunit.ts"]
};