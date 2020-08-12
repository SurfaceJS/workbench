// eslint-disable-next-line import/no-unassigned-import
import "../../components/dummy-child";
// eslint-disable-next-line import/no-unassigned-import
import "../../components/dummy-parent";

import CustomElement, { element } from "@surface/custom-element";
import template    from "./index.html";
import style       from "./index.scss";

@element("directives-view", template, style)
export default class DirectivesView extends CustomElement
{
    private lastId: number = 0;

    protected text:    string  = "";
    protected visible: boolean = true;

    protected items: number[] = [];

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