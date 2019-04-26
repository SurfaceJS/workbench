import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import template      from "./index.html";

@element("dummy-parent", template)
export default class DummyParent extends CustomElement
{
    protected items: Array<number> = [1, 3, 5, 7, 9];
    protected value: string        = "Scoped Value";
}