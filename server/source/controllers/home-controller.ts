import { ActionResult } from '@surface/web-host/action-result';
import { Controller }   from '@surface/web-host/controller';

export default class HomeController extends Controller
{
    public index(data: any): ActionResult
    {
        if (this.httpContext.request.method == 'GET')
            return super.view();
        else
            return super.json(null);
    }

    public edit(data: any): ActionResult
    {
        if (this.httpContext.request.method == 'GET')
            return super.view('edit');
        else
            return super.json(null);
    }
}