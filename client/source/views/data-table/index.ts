import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";

type People = { id: number, name: string, email: string, country: string  };

@element("data-table-view", template)
export default class DataTable extends View
{
    private _datasource: Iterable<People> = [];
    public get datasource(): Iterable<People>
    {
        return this._datasource;
    }

    public set datasource(value: Iterable<People>)
    {
        this._datasource = value;
    }

    public constructor()
    {
        super();
        this.viewName = "Data table";
        this.datasource =
        [
            { id: 1, name: "foo", email: "foo@mail.com", country: "Brazil" },
            { id: 2, name: "bar", email: "bar@mail.com", country: "England" },
            { id: 3, name: "baz", email: "baz@mail.com", country: "EUA" }
        ];
    }
}