import FileSystem from "../../core/src/IO/FileSystem";
import fs_promises from "node:fs/promises";
import Parser from "./Parser";
import { TSDocParser } from "@microsoft/tsdoc";
import Generator from "./Generator";

export default class Factory {
	static TSDocGenerator() {
		const fs = new FileSystem(fs_promises);
		const parser = new Parser(new TSDocParser());
		return new Generator(fs, fs_promises, parser);
	}
}