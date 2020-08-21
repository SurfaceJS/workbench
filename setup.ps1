
# Variables
$tsc = "$PSScriptRoot/modules/node_modules/.bin/tsc.ps1";

# Globals
npm i -g driveup python3;

# Modules
Set-Location "$PSScriptRoot/modules/tasks";
npm i;
Invoke-Expression $tsc;
node cli setup;

# Workbench
Set-Location "$PSScriptRoot/tasks";
npm i;
Invoke-Expression $tsc;
node cli setup;