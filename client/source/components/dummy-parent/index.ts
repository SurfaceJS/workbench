import CustomElement from "@surface/custom-element";
import { element }   from "@surface/custom-element/decorators";
import template      from "./index.html";

@element("dummy-parent", template)
export default class DummyParent extends CustomElement
{
    protected current: number = 0;

    protected items: Array<number> = [];
    protected value: string        = "Scoped Value";

    protected increment(): void
    {
        const items: Array<number> = [];

        for (let i = 0; i <= 1000; i++)
        {
            items.push(i);
        }

        console.time();
        this.items = items;//[...this.items, ...items];
        console.timeEnd();
    }

    protected random(): void
    {
        const items: Array<number> = [];

        for (let i = 0; i <= 100; i++)
        {
            items.push(Math.trunc(Math.random() * i));
        }

        console.time();
        this.items = items;//[...this.items, ...items];
        console.timeEnd();
    }
}