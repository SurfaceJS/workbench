import type { Indexer } from "@surface/core";
import type Settings    from "../types/settings.js";

declare let process: { env: Indexer<string> };

const settings: Settings =
{
    dev:          process.env.USERNAME!,
    environment: "production",
};
export default settings;
