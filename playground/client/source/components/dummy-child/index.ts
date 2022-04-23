import HTMLXElement, { element } from "@surface/htmlx-element";
import template                  from "./index.htmlx";
import style                     from "./index.scss";

@element("dummy-child", { style, template })
export default class DummyChild extends HTMLXElement
{
    protected value: string = "";

    public getDate(): number
    {
        return Date.now();
    }
}