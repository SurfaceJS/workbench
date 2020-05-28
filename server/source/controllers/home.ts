import { Indexer }                 from "@surface/core";
import { ActionResult,Controller } from "@surface/web-host";

export class Home extends Controller
{
    public index(inbound?: Indexer): ActionResult
    {
        if (this.httpContext.request.method == "GET")
        {
            return this.view();
        }
        else
        {
            return this.json(null);
        }
    }

    public edit(inbound?: Indexer): ActionResult
    {
        if (this.httpContext.request.method == "GET")
        {
            return this.view("edit");
        }
        else
        {
            return this.json(null);
        }
    }
}