import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		ignores: ["dist"]
	},
	{
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: { projectService: true }
		},
		plugins: { "@stylistic": stylistic },
		files: ["**/*.ts"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked
		],
		rules: {
			"indent": ["warn", "tab"],
			"quotes": ["warn", "double"],
			"@stylistic/object-curly-spacing": ["warn", "always"],
			"@stylistic/semi": ["warn", "always"],
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/restrict-template-expressions": "off"
		}
	}
]);