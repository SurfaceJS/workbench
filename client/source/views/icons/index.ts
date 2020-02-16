import "@surface/material-design/components/icon";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("icons-view", template)
export default class Icons extends View
{
    public constructor()
    {
        super();
        this.viewName = "Icons";
    }
}