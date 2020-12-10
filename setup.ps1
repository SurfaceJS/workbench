# Globals
npm i -g driveup cross-env;

# Modules
Set-Location "$PSScriptRoot/modules";
npm ci;
npm run build;

# Workbench
Set-Location "$PSScriptRoot";
npm ci;
npm run build;