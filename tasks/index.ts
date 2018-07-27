import fs          from "fs";
import path        from "path";
import * as common from "../modules/tasks/common";
import packages    from "./common/packages";

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
            commands.push(common.execute(`Building ${project.name}`, `tsc -p ${project.path}`));
        }

        await Promise.all(commands);

        console.log("Building done!");
    }

    public static link(): void
    {
        for (const project of projects)
        {
            const nodeModules = path.join(project.path, "node_modules");
            const original    = path.resolve(__dirname, "../modules/source/@surface");
            const symlink     = path.join(nodeModules, "@surface");

            if (!fs.existsSync(symlink))
            {
                common.makePath(nodeModules);
                //fs.symlinkSync(original, symlink);

                //console.log(`@surface linked to ${symlink}`);
                common.execute(`@surface linked to ${symlink}`, `mklink /J ${symlink} ${original}`);
            }
        }

        console.log("Linking done!");
    }

    public static unlink(): void
    {
        for (const project of projects)
        {
            const surface = path.join(project.path, "node_modules", "@surface");

            if (fs.existsSync(surface))
            {
                common.deletePath(surface);
                console.log(`@surface unlinked from ${surface}`);
            }
        }

        console.log("Unlinking done!");
    }

    public static relink(): void
    {
        Tasks.unlink();
        Tasks.link();
    }

    public static async install(full: "true"|"false"): Promise<void>
    {
        Tasks.unlink();

        const commands: Array<Promise<void>> = [];

        for (const $package of packages)
        {
            const dependencies = { ...$package.dependencies, ...$package.devDependencies };

            const targets = Object.keys(dependencies)
                .filter(x => !x.startsWith("@surface/") || full == "true")
                .map(key => `${key}@${dependencies[key].replace(/^(\^|\~)/, "")}`)
                .join(" ");

            if (targets)
            {
                commands.push(common.execute(`Installing ${$package.name} dependencies.`, `cd ${$package.path} && npm install ${targets} --save-exact`));
            }
        }

        await Promise.all(commands);

        Tasks.link();

        console.log("Installing done!");
    }

    public static async setup()
    {
        await Tasks.install("false");
        await Tasks.build();
    }
}