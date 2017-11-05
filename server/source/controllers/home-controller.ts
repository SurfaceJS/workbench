import { Controller }   from '@surface/web-host/controller';
import { ActionResult } from '@surface/web-host/action-result';

export class Home extends Controller
{
    public index(): ActionResult
    {
        return super.view();
    }
}