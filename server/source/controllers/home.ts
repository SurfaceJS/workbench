import { ObjectLiteral } from "@surface/core";
import ActionResult      from "@surface/web-host/action-result";
import Controller        from "@surface/web-host/controller";

export class Home extends Controller
{
    public index(inbound?: ObjectLiteral): ActionResult
    {
        if (super.httpContext.request.method == "GET")
        {
            return super.view();
        }
        else
        {
            return super.json(null);
        }
    }

    public edit(inbound?: ObjectLiteral): ActionResult
    {
        if (super.httpContext.request.method == "GET")
        {
            return super.view("edit");
        }
        else
        {
            return super.json(null);
        }
    }
}