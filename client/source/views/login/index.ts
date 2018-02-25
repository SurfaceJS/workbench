import template from "./index.html";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";

@element("login-view", template)
export default class Login extends View
{
    public constructor()
    {
        super();
        this.name = "Login";
    }
}