import child_process from "child_process";
import fs            from "fs";
import path          from "path";
import util          from "util";

let exec = util.promisify(child_process.exec);

export function cleanup(targetPath: string, pattern: RegExp, exclude: RegExp): void
{
    for (let source of fs.readdirSync(targetPath).map(x => path.join(targetPath, x)))
    {
        if (exclude.test(source))
        {
            continue;
        }

        if (fs.lstatSync(source).isDirectory())
        {
            module.exports.cleanup(source, pattern, exclude);
        }
        else if (pattern.test(source))
        {
            fs.unlinkSync(source);
        }
    }
}

export async function execute(label: string, command: string): Promise<void>
{
    try
    {
        console.log(label);
        const { stdout, stderr } = await exec(command);

        if (stdout)
        {
            console.log(stdout);
        }

        if (stderr)
        {
            console.log(stderr);
        }
    }
    catch (err)
    {
        console.log(err.message);
    }
}

export function makePath(targetPath: string, mode?: string|number): void
{
    if (fs.existsSync(targetPath))
    {
        targetPath = fs.lstatSync(targetPath).isSymbolicLink() ? fs.readlinkSync(targetPath) : targetPath;

        if (!fs.lstatSync(targetPath).isDirectory())
        {
            throw new Error(`${targetPath} exist and isn't an directory.`);
        }

        return;
    }

    const parentDir = path.dirname(targetPath.toString());
    // tslint:disable-next-line:no-magic-numbers
    mode = mode || parseInt("0777", 8) & (~process.umask());

    if (!fs.existsSync(parentDir))
    {
        makePath(parentDir, mode);
        return fs.mkdirSync(targetPath, mode);
    }
    else
    {
        return fs.mkdirSync(targetPath, mode);
    }
}

/**
 * @param {Object} source
 * @returns {Array<{ key: string, value: Object }>}
 */
export function objectToDictionary(source: Object): Array<{ key: string, value: Object }>
{
    let result = [];

    for (let key in source) {
        result.push({ key: key, value: source[key] });
    }

    return result;
}