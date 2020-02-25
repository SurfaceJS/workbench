import "./components";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";
import style       from "./index.scss";

@element("switches-view", template, style)
export default class Switches extends View
{
    public constructor()
    {
        super();
        this.viewName = "Switches";
    }
}