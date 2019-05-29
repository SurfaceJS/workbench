import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

@element("directives-view", template)
export default class DirectivesView extends View
{
    private lastId: number        = 0;
    public items:   Array<number> = [];

    public visible = true;

    public constructor()
    {
        super();
        this.viewName = "Directives";
    }

    public toogle(): void
    {
        console.time();
        this.visible = !this.visible;
        console.timeEnd();
    }

    public increment(): void
    {
        this.items.push(++this.lastId);
    }

    public decrement(): void
    {
        this.lastId--;
        this.items.pop();
    }

    public multiply(): void
    {
        this.items = this.items.map(x => [3, 4, 5].includes(x) ? x : x * 10);
    }
}