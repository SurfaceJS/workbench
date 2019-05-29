import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("menu-view", template)
export default class Menu extends View
{
    public constructor()
    {
        super();
        this.viewName = "Menu";
    }
}