import Usage from "command-line-usage";
import JUnitReporter from "./Reporters/JUnitReporter";
import Process from "process";
import Args from "command-line-args";
import Runner from "./Runners/Runner";
import SonarReporter from "./Reporters/SonarReporter";

export default class CLI {
    private static readonly options: Usage.OptionDefinition[] = [
        {
            name: "dir",
            alias: "d",
            type: String,
            defaultOption: true,
            typeLabel: "<directory>",
            description: "The path where tests to run are located (-d/--dir flag optional)"
        },
        {
            name: "junit",
            alias: "j",
            type: String,
            typeLabel: `[filename] (${JUnitReporter.defaultFileName})`,
            description: "Save results as JUnit-formatted XML"
        },
        {
            name: "sonar",
            alias: "s",
            type: String,
            typeLabel: `[filename] (${SonarReporter.defaultFileName})`,
            description: "Save results as SonarQube/SonarCloud-formatted XML"
        },
        {
            name: "quiet",
            alias: "q",
            type: Boolean,
            description: "Do not print test results to stdout"
        },
        {
            name: "help",
            alias: "h",
            type: Boolean,
            description: "Display this help page (and ignore all other options)"
        },
        {
            name: "filter",
            alias: "f",
            type: String,
            typeLabel: "[SuiteName.TestName]",
            description: "Run a single test by its fully qualified name"
        }
    ];

    private static readonly sections: Usage.Section[] = [
        {
            header: "xunit.ts",
            content: "A TypeScript unit testing framework, following standard xUnit patterns"
        },
        {
            header: "Usage",
            content: [
                "<npm run | yarn> xunit [-j|--junit [filename]] [-s|--sonar [filename]]",
                "[-q|--quiet] [-d|--dir] <directory>"
            ]
        },
        {
            header: "Examples",
            content: [
                "npm run xunit dist/tests",
                "yarn xunit --junit results.xml --dir dist/tests --quiet",
                "yarn xunit -q -s -d dist/tests"
            ]
        },
        {
            header: "Options",
            optionList: CLI.options
        }
    ];

    private static readonly usage = Usage(CLI.sections);

    constructor(private readonly runnerFactory: (args: Args.CommandLineOptions) => Runner, private readonly process: typeof Process) {
    }

    async run(): Promise<boolean> {
        const args = Args(CLI.options, { argv: this.process.argv });

        if (args.help) {
            this.process.stdout.write(CLI.usage);
            this.process.stdout.write("\n");
            return true;
        }

        const runner = this.runnerFactory(args);

        try {
            const results = args.filter
                ? await runner.runSelected(args.dir, args.filter)
                : await runner.runAll(args.dir);
            return Runner.allTestsPassed(results);
        } catch (error) {
            if (error instanceof Error) {
                this.process.stderr.write(`An unhandled ${error.name} occurred: ${error.message}\n`);
                this.process.stderr.write(error.stack?.toString() || "(no call stack)\n");
            }
            return false;
        }
    }
}