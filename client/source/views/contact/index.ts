import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("contact-view", template)
export default class Contact extends View
{
    public constructor()
    {
        super();
        this.viewName = "Contact";
    }
}