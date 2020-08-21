#!/usr/bin/env node
import { Command } from "commander";
import Tasks       from ".";

const program = new Command();

program
    .command("build")
    .action(Tasks.build);

program
    .command("install")
    .action(Tasks.install);

program
    .command("link")
    .action(Tasks.link);

program
    .command("relink")
    .action(Tasks.relink);

program
    .command("setup")
    .action(Tasks.setup);

program
    .command("unlink")
    .action(Tasks.unlink);

program.parse(process.argv);