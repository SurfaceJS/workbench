import type { Indexer } from "@surface/core";
import type Settings    from "../types/settings";

declare let process: { env: Indexer<string> };

const settings: Settings =
{
    dev:        process.env.USERNAME!,
    enviroment: "production",
};
export default settings;