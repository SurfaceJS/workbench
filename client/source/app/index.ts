/* eslint-disable import/no-unassigned-import */
import "@surface/material-design/components/app";
import "@surface/material-design/components/app-bar";
import "@surface/material-design/components/app-toogle";
import "@surface/material-design/components/content";
import "@surface/material-design/components/footer";
import "@surface/material-design/components/navigation-drawer";
import "@surface/material-design/components/switch";

import CustomElement, { element } from "@surface/custom-element";
import MaterialDesign             from "@surface/material-design";
import settings                   from "../enviroments/settings";
import template                   from "./index.html";
import style                      from "./index.scss?raw";

@element("app-root", template, style)
export default class App extends CustomElement
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
}