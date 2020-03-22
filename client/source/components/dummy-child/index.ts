import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import template      from "./index.html";
import style         from "./index.scss";

@element("dummy-child", template, style)
export default class DummyChild extends CustomElement
{
    private _value: string = "";

    public get value(): string
    {
        return this._value;
    }

    public set value(value: string)
    {
        this._value = value;
    }
}