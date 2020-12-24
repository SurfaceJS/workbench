import type { Indexer }      from "@surface/core";
import type { ActionResult } from "@surface/web-host";
import { Controller }        from "@surface/web-host";

export default class Home extends Controller
{
    public index(_inbound?: Indexer): ActionResult
    {
        if (this.httpContext.request.method == "GET")
        {
            return this.view();
        }

        return this.json(null);
    }

    public edit(_inbound?: Indexer): ActionResult
    {
        if (this.httpContext.request.method == "GET")
        {
            return this.view("edit");
        }

        return this.json(null);
    }
}