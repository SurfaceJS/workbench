const fs   = require('fs');
const path = require('path');
const util = require('util');

let exec = util.promisify(require('child_process').exec);

/**
 * @param targetPath {string}
 * @param pattern    {RegExp}
 * @param exclude    {RegExp}
 */
module.exports.cleanup = function(targetPath, pattern, exclude)
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
    if (fs.existsSync(path))
        return;

    let slices = path.replace(/\\/g, '/').split('/');

    let target = '';
    for (let slice of slices)
    {
        target += slice + '/';

        if (!fs.existsSync(target))
            fs.mkdirSync(target)
    }
}

module.exports.objectToDictionary = function(source)
{
    let result = [];

    for (let key in source)
        result.push({ key: key, value: source[key] })

    return result
}