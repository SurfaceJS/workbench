import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("stack-panel-view", template)
export default class StackPanel extends View
{
    public constructor()
    {
        super();
        this.viewName = "Stack Panel";
    }
}