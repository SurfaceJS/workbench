import { Controller }   from '@surface/server/library/controller';
import { ActionResult } from '@surface/server/library/action-result';

export class Home extends Controller
{
    public index(): ActionResult
    {
        return super.view();
    }
}