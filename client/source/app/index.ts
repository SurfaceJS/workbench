import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import ColorBucket   from "@surface/material-design/color-bucket";
import ThemeHandler  from "@surface/material-design/theme-handler";
import Router        from "@surface/router";
import ViewHost      from "@surface/view-host";
import ViewManager   from "@surface/view-manager";
import template      from "./index.html";
import style         from "./index.scss?raw";
import { load }      from "./module-loader";

ColorBucket.use({ light: { secondary: "lime", text: "white" }, dark: { secondary: "orange", text: "gray" } });
ColorBucket.initialize();

@element("app-root", template, style)
export class App extends CustomElement
{
    private readonly _themehadler = new ThemeHandler();

    private viewManager!: ViewManager;

    private _dark: boolean = false;
    public get dark(): boolean
    {
        return this._dark;
    }

    public set dark(value: boolean)
    {
        this._dark = value;

        this._themehadler.toogle();
    }

    public data: string = "";

    public constructor()
    {
        super();

        const router = new Router().mapRoute("default", "{view=data-table}/{action=index}/{id?}", true);

        this.viewManager = ViewManager.configure(super.references.viewHost as ViewHost, router, load);

        this.routeTo(window.location.pathname + window.location.search);
    }

    public async routeTo(route: string): Promise<void>
    {
        await this.viewManager.routeTo(route);
    }
}