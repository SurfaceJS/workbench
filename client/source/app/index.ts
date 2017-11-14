import { CustomElement }       from '@surface/custom-element';
import { component }           from '@surface/custom-element/decorators';
import { Router, RoutingType } from '@surface/router';

import lazyLoader from '@surface/lazy-loader';

import template from "index.html";
import style    from "index.scss";
import { Route } from '@surface/router/route';

@component<App>('app-root', template, style)
export class App extends CustomElement
{
    private router: Router;
    public constructor()
    {
        super();        
        this.router = Router.create(RoutingType.History, [])
            .when('/*', this.setView);

        this.router.routeTo(window.location.pathname + window.location.search);
    }
    
    public async setView(match: Route.Match)
    {
        console.log(match);
        await lazyLoader(match.route);
    }
}