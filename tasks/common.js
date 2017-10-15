const FS   = require('fs');
const Path = require('path');
const Util = require('util');

let exec = Util.promisify(require('child_process').exec);

/**
 * @param path    {string}
 * @param pattern {RegExp}
 * @param exclude {RegExp}
 */
module.exports.cleanup = function(path, pattern, exclude)
{
    for (let source of FS.readdirSync(path).map(x => Path.join(path, x)))
    {
        if (exclude.test(source))
            continue;
            
        if (FS.lstatSync(source).isDirectory())
        {
            module.exports.cleanup(source, pattern, exclude);
        }        
        else if (pattern.test(source))
        {
            FS.unlinkSync(source);
        }
    }
}

/**
 * @param label   {string}
 * @param command {string}
 */
module.exports.execute = async function (label, command)
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
 * @param path {string}
 */
module.exports.makeDir = function (path)
{
    if (FS.existsSync(path))
        return;

    let slices = path.replace(/\\/g, '/').split('/');

    let target = '';
    for (let slice of slices)
    {
        target += slice + '/';

        if (!FS.existsSync(target))
            FS.mkdirSync(target)
    }
}

module.exports.objectToDictionary = function(source)
{
    let result = [];

    for (let key in source)
        result.push({ key: key, value: source[key] })

    return result
}