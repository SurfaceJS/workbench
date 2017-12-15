const fs   = require("fs");
const path = require("path");
const util = require("util");

let exec = util.promisify(require("child_process").exec);

/**
 * @param {string} targetPath
 * @param {RegExp} pattern
 * @param {RegExp} exclude
 */
module.exports.cleanup = function cleanup(targetPath, pattern, exclude)
{
    for (let source of fs.readdirSync(targetPath).map(x => path.join(targetPath, x)))
    {
        if (exclude.test(source))
            continue;
            
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

/**
 * @param {string} label
 * @param {string} command
 */
module.exports.execute = async function execute(label, command)
{
    try
    {
        const { stdout, stderr } = await exec(command);
        console.log(label, stdout);
        if (stderr)
            console.log(stderr, stderr);
    }
    catch(err)
    {
        console.log(err.message)
    }
}

/**
 * @param {string}        targetPath
 * @param {string|number} mode
 */
module.exports.makePath = function makePath(targetPath, mode)
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
    mode = parseInt("0777", 8) & (~process.umask());

    if(fs.existsSync(parentDir))
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
 */
module.exports.objectToDictionary = function objectToDictionary(source)
{
    let result = [];

    for (let key in source)
        result.push({ key: key, value: source[key] })

    return result
}