/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs           from "fs";
import path         from "path";
import chalk        from "chalk";
import { IPackage } from "npm-registry-client";
import
{
    createPath,
    execute,
    paths,
    removePath,
    timestamp,
} from "../modules/tasks/internal/common";

const root = path.resolve(__dirname, "..");

const projects =
[
    { name: "client", path: path.resolve(__dirname, "../client") },
    { name: "server", path: path.resolve(__dirname, "../server") },
];

export default class Tasks
{
    public static async build(): Promise<void>
    {
        const commands: Promise<void>[] = [];

        for (const project of projects.filter(x => x.name != "client"))
        {
            commands.push(execute(`${timestamp()} Building ${chalk.bold.blue(project.name)}`, `tsc -p ${project.path}`));
        }

        await Promise.all(commands);

        console.log(`${timestamp()} ${chalk.bold.green("Building workbench done!")}`);
    }

    public static async install(): Promise<void>
    {
        await Tasks.unlink();

        const commands: Promise<void>[] = [];

        for (const $package of projects.map(x => require(path.join(x.path, "package.json")) as IPackage))
        {
            commands.push(execute(`${timestamp()} Installing ${chalk.bold.blue($package.name)} dependencies.`, `cd ${path.resolve(root, $package.name)} && npm install`));        }

        await Promise.all(commands);

        await Tasks.link();

        console.log(`${timestamp()} ${chalk.bold.green("Installing done!")}`);
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

    public static async setup(): Promise<void>
    {
        await Tasks.install();
        await Tasks.build();
    }
}