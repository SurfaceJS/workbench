import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.htmx";
import style                      from "./index.scss";

@element("dummy-parent", { style, template })
export default class DummyParent extends CustomElement
{
    protected current: number = 0;

    protected items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    protected value: string   = "Scoped Value";

    protected increment(): void
    {
        this.items = this.items.map(x => x + 3);
    }

    protected random(): void
    {
        const items: number[] = [];

        for (let i = 0; i < this.items.length; i++)
        {
            items.push(Math.trunc(Math.random() * 2 + i));
        }

        this.items = items;
    }
}