import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("switches-view", template)
export default class Switches extends View
{
    public constructor()
    {
        super();
        this.viewName = "Switches";
    }
}