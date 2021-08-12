import Args from 'command-line-args';
import ConsoleReporter from './Reporters/ConsoleReporter';
import FileSystem from './IO/FileSystem';
import JUnitReporter from './Reporters/JUnitReporter';
import Output from './IO/Output';
import ResultReporter from './Reporters/ResultReporter';
import Runner from './Runners/Runner';
import TestRunner from './Runners/TestRunner';
import TestSuiteLoader from './Runners/TestSuiteLoader';
import TestSuiteRunner from './Runners/TestSuiteRunner';
import fs from "fs/promises";
import SonarReporter from "./Reporters/SonarReporter";
import Parser from "./TSDoc/Parser";
import {TSDocParser} from "@microsoft/tsdoc";
import Generator from "./TSDoc/Generator";

export default class Factory {
    private static readonly file_system = new FileSystem(fs);

    static Runner(args: Args.CommandLineOptions) {
        const loader = new TestSuiteLoader(this.file_system);
        const reporters = this.Reporters(args);
        const test_runner = new TestRunner(reporters);
        const test_suite_runner = new TestSuiteRunner(test_runner, reporters);

        return new Runner(loader, test_suite_runner, reporters);
    }

    static Reporters(args: Args.CommandLineOptions): ReadonlyArray<ResultReporter> {
        return [
            !args.quiet ? new ConsoleReporter(new Output(process.stdout)) : null,
            args.junit !== undefined ? new JUnitReporter(this.file_system, args.junit ?? JUnitReporter.defaultFileName) : null,
            args.sonar !== undefined ? new SonarReporter(this.file_system, args.sonar ?? SonarReporter.defaultFileName) : null
        ].filter(r => r !== null) as ResultReporter[];
    }
    
    static TSDocGenerator() {
        const parser = new Parser(new TSDocParser());
        return new Generator(this.file_system, fs, parser);
    }

}