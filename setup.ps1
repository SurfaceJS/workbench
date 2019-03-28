
$Location = $PSScriptRoot;
npm i -g typescript tslint mocha nyc driveup;
Set-Location '.\modules';
npm i;
tsc -p './tasks';
npm run 'task:setup';
Set-Location $Location;
tsc -p './tasks';
node './tasks/cli' 'setup';