import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("login-view", template)
export default class Login extends View
{
    public constructor()
    {
        super();
        this.viewName = "Login";
    }
}