import template from "./index.html";

import { element } from "@surface/custom-element/decorators";
import { View }    from "@surface/view";

@element("home-view", template)
export class Home extends View
{
    public constructor()
    {
        super();
        this.$name = "Home";
    }
}