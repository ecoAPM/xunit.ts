import Usage from 'command-line-usage';
import JUnitReporter from './Reporters/JUnitReporter';
import Process from "process";
import Args from "command-line-args";
import Factory from "./Factory";
import Runner from "./Runners/Runner";

export default class CLI {
    private static readonly options: Usage.OptionDefinition[] = [
        {
            name: "dir",
            alias: "d",
            type: String,
            defaultOption: true,
            typeLabel: "directory (required)",
            description: "The path where tests to run are located (-d/--dir flag optional)"
        },
        {
            name: "junit",
            alias: "j",
            type: String,
            typeLabel: `filename (default: ${JUnitReporter.defaultFileName})`,
            description: "Saves results as JUnit-formatted XML"
        },
        {
            name: "help",
            alias: "h",
            type: Boolean,
            description: "Displays this help page"
        },
        {
            name: "quiet",
            alias: "q",
            type: Boolean,
            description: "Do not print test results to stdout"
        }
    ];

    private static readonly sections: Usage.Section[] = [
        {
            header: "xunit.ts",
            content: "A TypeScript unit testing framework, following standard xUnit patterns"
        },
        {
            header: "Usage",
            content: "npm run xunit dist/tests\n"
                + "yarn xunit --junit results.xml --dir dist/tests --quiet"
        },
        {
            header: "Options",
            optionList: CLI.options
        }
    ];

    private static readonly usage = Usage(CLI.sections);

    constructor(private readonly process: typeof Process) {
    }

    async run(): Promise<boolean> {
        const args = Args(CLI.options, {argv: this.process.argv});

        if (args.help) {
            this.process.stdout.write(CLI.usage);
            this.process.stdout.write('\n');
            return true;
        }

        const runner = Factory.Runner(args);

        try {
            const results = await runner.runAll(args.dir);
            return Runner.allTestsPassed(results);
        } catch (error) {
            this.process.stderr.write(`An unhandled ${error.name} occurred: ${error.message}\n`);
            this.process.stderr.write(error.stack?.toString() || '(no call stack)\n');
            return false;
        }
    }
}