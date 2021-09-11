import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("dummy-child", { style, template })
export default class DummyChild extends CustomElement
{
    protected value: string = "";

    public getDate(): number
    {
        return Date.now();
    }
}