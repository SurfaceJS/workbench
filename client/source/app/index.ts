import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("app-root", template, style)
export default class App extends CustomElement
{
    private _data: string = "";
    public get data(): string
    {
        return this._data;
    }

    public set data(value: string)
    {
        this._data = value;
    }
}