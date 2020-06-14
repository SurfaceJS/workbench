
# Globals
npm i -g typescript tslint mocha nyc driveup python3;

# Modules
Set-Location "$PSScriptRoot/modules/tasks";
npm i;
tsc;
node cli setup;

# Workbench
Set-Location "$PSScriptRoot/tasks";
npm i;
tsc;
node cli setup;