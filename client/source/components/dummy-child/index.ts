import CustomElement          from "@surface/custom-element";
import { attribute, element } from "@surface/custom-element/decorators";
import template               from "./index.html";

@element("dummy-child", template)
export default class DummyParent extends CustomElement
{
    private _value: string = "";

    @attribute
    public get value(): string
    {
        return this._value;
    }

    public set value(value: string)
    {
        this._value = value;
    }
}