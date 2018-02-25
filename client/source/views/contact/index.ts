import template from "./index.html";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";

@element("contact-view", template)
export default class Contact extends View
{
    public constructor()
    {
        super();
        this.name = "Contact";
    }
}