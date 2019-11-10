
$Location = $PSScriptRoot;
npm i -g typescript tslint mocha nyc driveup python3;
Set-Location '.\modules';
npm i;
tsc -p './tasks';
node './tasks/cli' 'setup';
Set-Location $Location;
tsc -p './tasks';
node './tasks/cli' 'setup';