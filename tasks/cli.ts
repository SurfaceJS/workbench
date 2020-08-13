import { MethodsOf } from "../modules/source/@surface/core";
import Tasks         from ".";

const [action, parameter] = process.argv.slice(2) as [MethodsOf<typeof Tasks>, string];

const task = Tasks[action];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
void task(...(parameter || "").split(",") as Parameters<typeof task>);