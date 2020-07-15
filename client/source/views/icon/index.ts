import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("icon-view", template)
export default class Icon extends CustomElement
{
    protected static get observedAttributes(): Array<string>
    {
        return ["name"];
    }
}