import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("home-view", template)
export default class Home extends View
{
    public constructor()
    {
        super();
        this.viewName = "Home";
    }
}