const Util = require('util');

let exec = Util.promisify(require('child_process').exec);

module.exports = async function execute(label, command)
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