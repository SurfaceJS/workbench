const FS = require('fs');

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