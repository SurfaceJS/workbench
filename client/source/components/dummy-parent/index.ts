import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import template      from "./index.html";

@element("dummy-parent", template)
export default class DummyParent extends CustomElement
{
    private _value: string = "Scoped Value";

    public get value(): string
    {
        return this._value;
    }

    public set value(value: string)
    {
        this._value = value;
    }

    public constructor()
    {
        super({ mode: "open" });
    }
}