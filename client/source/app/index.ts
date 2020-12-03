// eslint-disable-next-line import/no-unassigned-import
import "./components";

import CustomElement, { element } from "@surface/custom-element";
import MaterialDesign             from "@surface/material-design";
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
}