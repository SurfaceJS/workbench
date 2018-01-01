import template from "./index.html";
import style    from "./index.scss";
import { load } from "./module-loader";

import { CustomElement } from "@surface/custom-element";
import { element }       from "@surface/custom-element/decorators";
import { Router }        from "@surface/router";
import { ViewManager }   from "@surface/view-manager";
import { ViewHost }      from "@surface/view-host";

@element("app-root", template, style)
export class App extends CustomElement
{
    private viewHost:    ViewHost;
    private viewManager: ViewManager;

    private contactLink: HTMLLinkElement;
    private homeLink:    HTMLLinkElement;
    private loginLink:   HTMLLinkElement;

    public constructor()
    {
        super();
        this.viewHost    = super.attach("surface-view-host");
        this.contactLink = super.attach("#contact-link");
        this.homeLink    = super.attach("#home-link");
        this.loginLink   = super.attach("#login-link");

        const router = new Router().mapRoute("default", "{view=home}/{action=index}/{id?}", true);

        this.viewManager = ViewManager.configure(this.viewHost, router, load);
        this.viewManager.routeTo(window.location.pathname + window.location.search);

        this.contactLink.onclick = async () => await this.viewManager.routeTo("/contact");
        this.homeLink.onclick    = async () => await this.viewManager.routeTo("/");
        this.loginLink.onclick   = async () => await this.viewManager.routeTo("/login");
    }
}