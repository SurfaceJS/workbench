import "./components";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("buttons-view", template)
export default class Buttons extends View
{
    public constructor()
    {
        super();
        this.viewName = "Buttons";
    }
}