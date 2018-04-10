import { execute } from "./common";

const filename = process.argv[2];
execute(`cover ${filename} tests`, `nyc --include ./**/${filename.replace(".spec", "")}.js --exclude tests/* --reporter=text mocha --ui tdd ${filename}.js`);