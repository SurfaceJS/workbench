import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("modal-view", template)
export default class Modal extends View
{
    public constructor()
    {
        super();
        this.viewName = "Modal";
    }
}