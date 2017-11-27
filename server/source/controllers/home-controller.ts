import { ObjectLiteral } from '@surface/types';
import { ActionResult }  from '@surface/web-host/action-result';
import { Controller }    from '@surface/web-host/controller';

export default class HomeController extends Controller
{
    public index(inbound?: ObjectLiteral<string>): ActionResult
    {
        if (this.httpContext.request.method == 'GET')
        {
            return super.view();
        }
        else
        {
            return super.json(null);
        }
    }

    public edit(inbound?: ObjectLiteral<string>): ActionResult
    {
        if (this.httpContext.request.method == 'GET')
        {
            return super.view('edit');
        }
        else
        {
            return super.json(null);
        }
    }
}