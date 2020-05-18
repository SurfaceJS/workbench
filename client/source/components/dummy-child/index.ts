import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("dummy-child", template, style)
export default class DummyChild extends CustomElement
{
    protected value: string = "";
}