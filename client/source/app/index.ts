import template                from "./index.html";
import style                   from "./index.scss";
import { CustomElement }       from '@surface/custom-element';
import { define }              from '@surface/custom-element/decorators';
import { load }                from '@surface/lazy-loader';
import { Router, RoutingType } from '@surface/router';
import { Route }               from '@surface/router/route';

@define<App>('app-root', template, style)
export class App extends CustomElement
{
    private router: Router;
    public constructor()
    {
        super();
        this.router = Router.create(RoutingType.History)
            .mapRoute('default', '{view}/{action}/{id?}')
            .when('*', this.setView);

        this.router.routeTo(window.location.pathname + window.location.search);
    }
    
    public async setView(routeData: Route.Data)
    {
        console.log(routeData);
        await load(routeData.route);
    }
}