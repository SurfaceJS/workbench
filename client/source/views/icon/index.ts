import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("icon-view", template)
export default class Icon extends View
{
    protected static get observedAttributes(): Array<string>
    {
        return ["name"];
    }

    public constructor()
    {
        super();
        this.viewName = "Icon";
    }
}