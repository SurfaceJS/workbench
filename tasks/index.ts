import fs          from "fs";
import path        from "path";
import * as common from "../modules/tasks/common";
import packages    from "./common/packages";

const paths =
[
    path.resolve(__dirname, "../client"),
    path.resolve(__dirname, "../server")
];

export default class Tasks
{
    public static link(): void
    {
        for (const targetPath of paths)
        {
            const nodeModules = path.join(targetPath, "node_modules");
            const original    = path.resolve(__dirname, "../modules/source/@surface");
            const symlink     = path.join(nodeModules, "@surface");

            if (!fs.existsSync(symlink))
            {
                common.makePath(nodeModules);
                fs.symlinkSync(original, symlink);

                console.log(`@surface linked to ${symlink}`);
            }
        }
    }

    public static unlink(): void
    {
        for (const targetPath of paths)
        {
            const surface = path.join(targetPath, "node_modules", "@surface");

            if (fs.existsSync(surface))
            {
                common.deletePath(surface);
                console.log(`@surface unlinked from ${surface}`);
            }
        }
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

        console.log("Done!");
    }

    public static setup()
    {
        Tasks.install("false");
    }
}