import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";
// import ParallelWorker from '@surface/custom-element/internal/parallel-worker';

function _random(max: number)
{
    return Math.round(Math.random() * 1000) % max;
}

@element("data-table-view", template)
export default class DataTable extends View
{
    private started: number = 0;
    protected message: string = "";

    protected currentId                                  = 0;
    protected data: Array<{ id: number, label: string }> = [];
    protected selected: number|null = null;

    public constructor()
    {
        super();
        this.viewName = "Data Table";
    }

    private start(): void
    {
        this.started = performance.now();
    }

    private stop(): void
    {
        window.setTimeout(() => this.message = `Time expended: ${performance.now() - this.started}ms`);
        // ParallelWorker.done().then(() => this.message = `Time expended: ${performance.now() - this.started}ms`);
    }

    public buildData(count = 1000)
    {
        let adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        let colours    = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        let nouns      = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        let data       = [];

        for (let i = 0; i < count; i++)
        {
            data.push({id: this.currentId++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
        }

        return data;
    }

    public updateData()
    {
        for (let i = 0; i < this.data.length; i += 10)
        {
            this.data[i].label += " !!!";
        }
    }

    public delete(id: number)
    {
        const idx = this.data.findIndex(x => x.id == id);
        this.data = this.data.slice(0, idx).concat(this.data.slice(idx + 1));
    }

    public run()
    {
        const data = this.buildData();
        this.selected = null;

        this.start();

        this.data = data;

        this.stop();
    }

    public add()
    {
        const data = this.data.concat(this.buildData(1000));

        this.start();

        this.data = data;

        this.stop();
    }

    public update()
    {
        this.start();

        this.updateData();

        this.stop();
    }

    public select(id: number)
    {
        this.selected = id;
    }

    public runLots()
    {
        const data    = this.buildData(10000);
        this.selected = null;

        this.start();

        this.data = data;

        this.stop();
    }

    public clear()
    {
        this.start();

        this.data = [];
        this.selected = null;

        this.stop();
    }

    public swapRows()
    {
        if (this.data.length > 998)
        {
            const newData = [...this.data];

            let d1   = newData[1];
            let d998 = newData[998];

            newData[998] = d1;
            newData[1]   = d998;

            this.start();

            this.data = newData;

            this.stop();
        }
    }
}