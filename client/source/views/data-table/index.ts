/* eslint-disable max-len */
import CustomElement, { element, scheduler } from "@surface/custom-element";
import template                              from "./index.html";

function _random(max: number): number
{
    return Math.round(Math.random() * 1000) % max;
}

@element("data-table-view", template)
export default class DataTable extends CustomElement
{
    private started: number = 0;

    protected currentId: number                          = 0;
    protected data:      { id: number, label: string }[] = [];
    protected message:   string                          = "";
    protected selected:  number | null                   = null;

    private start(): void
    {
        this.message = "Processing...";
        this.started = performance.now();
    }

    private stop(): void
    {
        void scheduler.whenDone().then(() => this.message = `Time expended: ${performance.now() - this.started}ms`);
    }

    public buildData(count: number = 1000): { id: number, label: string }[]
    {
        const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        const colours    = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        const nouns      = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        const data       = [];

        console.time();

        for (let i = 0; i < count; i++)
        {
            data.push
            ({
                id:    this.currentId++,
                label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`,
            });
        }

        console.timeEnd();

        return data;
    }

    public updateData(): void
    {
        for (let i = 0; i < this.data.length; i += 10)
        {
            this.data[i].label += " !!!";
        }
    }

    public delete(id: number): void
    {
        const idx = this.data.findIndex(x => x.id == id);
        this.data = this.data.slice(0, idx).concat(this.data.slice(idx + 1));
    }

    public run(): void
    {
        const data = this.buildData();
        this.selected = null;

        this.start();

        this.data = data;

        this.stop();
    }

    public add(): void
    {
        const data = this.data.concat(this.buildData(1000));

        this.start();

        this.data = data;

        this.stop();
    }

    public update(): void
    {
        this.start();

        this.updateData();

        this.stop();
    }

    public select(id: number): void
    {
        this.selected = id;
    }

    public runLots(): void
    {
        const data    = this.buildData(10000);
        this.selected = null;

        this.start();

        this.data = data;

        this.stop();
    }

    public clear(): void
    {
        this.start();

        this.data = [];
        this.selected = null;

        this.stop();
    }

    public swapRows(): void
    {
        if (this.data.length > 998)
        {
            const newData = [...this.data];

            const d1   = newData[1];
            const d998 = newData[998];

            newData[998] = d1;
            newData[1]   = d998;

            this.start();

            this.data = newData;

            this.stop();
        }
    }
}