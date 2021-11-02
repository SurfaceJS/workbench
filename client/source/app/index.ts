/* eslint-disable import/no-unassigned-import */
import "@surface/material-design/components/app";
import "@surface/material-design/components/app-bar";
import "@surface/material-design/components/app-toogle";
import "@surface/material-design/components/content";
import "@surface/material-design/components/footer";
import "@surface/material-design/components/navigation-drawer";
import "@surface/material-design/components/switch";

import HTMLXElement, { element } from "@surface/htmlx-element";
import MaterialDesign            from "@surface/material-design";
import settings                  from "../enviroments/settings";
import css                       from "./index.css?file";
import template                  from "./index.htmlx";
import style                     from "./index.scss";

@element("app-root", { style, template })
export default class App extends HTMLXElement
{
    private _dark: boolean = false;
    public get dark(): boolean
    {
        return this._dark;
    }

    public set dark(value: boolean)
    {
        this._dark = value;

        value ? MaterialDesign.useDark() : MaterialDesign.useLight();
    }

    public settings = settings;

    public constructor()
    {
        super();

        const logo = new URL("../assets/placeholder.png", import.meta.url);

        console.log(logo, css);
    }
}