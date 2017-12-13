import template from "./index.html";
//import style    from "./index.scss";
import { load } from "./lazy-loader";

import { CustomElement } from "@surface/custom-element";
import { element }       from "@surface/custom-element/decorators";
import { Router }        from "@surface/router";
import { ViewManager }   from "@surface/view-manager";
import { ViewHost }      from "@surface/view-host";

@element("app-root", template)//, style)
export class App extends CustomElement
{
    private _viewHost:    ViewHost;
    private _viewManager: ViewManager;

    private _contactLink: HTMLLinkElement;
    private _homeLink:    HTMLLinkElement;
    private _loginLink:   HTMLLinkElement;

    public constructor()
    {
        super();
        this._viewHost    = super.attach("surface-view-host");
        this._contactLink = super.attach("#contact-link");
        this._homeLink    = super.attach("#home-link");
        this._loginLink   = super.attach("#login-link");

        const router = new Router().mapRoute("default", "{view=home}/{action=index}/{id?}", true);

        this._viewManager = ViewManager.configure(this._viewHost, router, load);
        this._viewManager.routeTo(window.location.pathname + window.location.search);

        this._contactLink.onclick = () => this._viewManager.routeTo("/contact");
        this._homeLink.onclick    = () => this._viewManager.routeTo("/");
        this._loginLink.onclick   = () => this._viewManager.routeTo("/login");
    }
}