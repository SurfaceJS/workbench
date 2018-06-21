import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import Router        from "@surface/router";
import ViewHost      from "@surface/view-host";
import ViewManager   from "@surface/view-manager";
import template      from "./index.html";
import style         from "./index.scss";
import { load }      from "./module-loader";

@element("app-root", template, style)
export class App extends CustomElement
{
    private viewHost:    ViewHost;
    private viewManager: ViewManager;

    public constructor()
    {
        super();
        this.viewHost = super.shadowQuery<ViewHost>("surface-view-host")!;

        const router = new Router().mapRoute("default", "{view=menu}/{action=index}/{id?}", true);

        this.viewManager = ViewManager.configure(this.viewHost, router, load);

        console.log(`Start routing${window.location.pathname + window.location.search}`);
        this.routeTo(window.location.pathname + window.location.search);
        console.log(`End routing${window.location.pathname + window.location.search}`);
    }

    public async routeTo(route: string): Promise<void>
    {
        await this.viewManager.routeTo(route);
        console.log(`routed to${route}`);
    }
}