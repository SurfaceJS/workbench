/* eslint-disable import/no-unassigned-import */
import "../../components/dummy-child";
import "../../components/dummy-parent";

import HTMLXElement, { element } from "@surface/htmlx-element";
import template                   from "./index.htmlx";
import style                      from "./index.scss";

@element("directives-view", { style, template })
export default class DirectivesView extends HTMLXElement
{
    private lastId: number = 0;

    protected text:    string  = "";
    protected visible: boolean = true;

    protected items: number[] = [];

    public toogle(): void
    {
        this.visible = !this.visible;
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