import Tasks         from ".";
import { MethodsOf } from "../modules/source/@surface/core";

const [action, parameter] = process.argv.slice(2) as [MethodsOf<typeof Tasks>, string];

// tslint:disable-next-line:no-any
Tasks[action].apply<typeof Tasks, any, any>(Tasks, (parameter || "").split(","));