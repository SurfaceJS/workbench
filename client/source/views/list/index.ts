import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("list-view", template)
export default class List extends View
{
    public constructor()
    {
        super();
        this.viewName = "List";
    }
}