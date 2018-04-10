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
    private readonly viewHost:    ViewHost;
    private readonly viewManager: ViewManager;

    public constructor()
    {
        super();
        this.viewHost = super.find("surface-view-host");

        const router = new Router().mapRoute("default", "{view=home}/{action=index}/{id?}", true);

        this.viewManager = ViewManager.configure(this.viewHost, router, load);
        this.viewManager.routeTo(window.location.pathname + window.location.search);
    }

    public routeTo(route: string): void
    {
        this.viewManager.routeTo(route);
    }
}