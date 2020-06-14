import chalk from "chalk";
import fs    from "fs";
import path  from "path";
import
{
    createPath,
    execute,
    paths,
    removePath,
    timestamp
} from "../modules/tasks/internal/common";

const projects =
[
    { name: "client", path: path.resolve(__dirname, "../client") },
    { name: "server", path: path.resolve(__dirname, "../server") }
];

export default class Tasks
{
    public static async build(): Promise<void>
    {
        const commands: Array<Promise<void>> = [];

        for (const project of projects.filter(x => x.name != "client"))
        {
            commands.push(execute(`${timestamp()} Building ${chalk.bold.blue(project.name)}`, `tsc -p ${project.path}`));
        }

        await Promise.all(commands);

        console.log(`${timestamp()} ${chalk.bold.green("Building workbench done!")}`);
    }

    public static async link(): Promise<void>
    {
        for (const project of projects)
        {
            const nodeModules = path.join(project.path, "node_modules");
            const symlink     = path.join(nodeModules, "@surface");

            if (!fs.existsSync(symlink))
            {
                createPath(nodeModules);

                await execute(`${timestamp()} @surface linked to ${chalk.bold.blue(symlink)}`, `mklink /J ${symlink} ${paths.source.surface}`);
            }
        }

        console.log(`${timestamp()} ${chalk.bold.green("Linking done!")}`);
    }

    public static async unlink(): Promise<void>
    {
        for (const project of projects)
        {
            const surface = path.join(project.path, "node_modules", "@surface");

            if (fs.existsSync(surface))
            {
                removePath(surface);
                console.log(`${timestamp()} @surface unlinked from ${chalk.bold.blue(surface)}`);
            }
        }

        console.log(`${timestamp()} ${chalk.bold.green("Unlinking done!")}`);

        await Promise.resolve();
    }

    public static async relink(): Promise<void>
    {
        await Tasks.unlink();
        await Tasks.link();
    }

    public static async setup()
    {
        await Tasks.relink();
        await Tasks.build();
    }
}