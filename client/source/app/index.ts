import "@surface/view-host";

import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import Router        from "@surface/router";
import ViewManager   from "@surface/view-manager";
import template      from "./index.html";
import style         from "./index.scss";
import { load }      from "./module-loader";

@element("app-root", template, style)
export class App extends CustomElement
{
    private viewManager!: ViewManager;

    private _data: string = "";
    public get data(): string
    {
        return this._data;
    }

    public set data(value: string)
    {
        this._data = value;
    }

    public constructor()
    {
        super();

        const router = new Router().mapRoute("default", "{view=data-table}/{action=index}/{id?}", true);

        this.viewManager = ViewManager.configure(super.references.viewHost as import("@surface/view-host").default, router, load);

        this.routeTo(window.location.pathname + window.location.search);
    }

    public async routeTo(route: string): Promise<void>
    {
        await this.viewManager.routeTo(route);
    }
}