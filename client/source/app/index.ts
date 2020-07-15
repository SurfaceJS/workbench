import CustomElement, { element } from "@surface/custom-element";
import ViewRouter                 from "@surface/view-router";
import template                   from "./index.html";
import style                      from "./index.scss";
import routes                     from "./routes";

@element("app-root", template, style)
export class App extends CustomElement
{
    private _data: string = "";
    public get data(): string
    {
        return this._data;
    }

    public set data(value: string)
    {
        this._data = value;
    }

    public constructor()
    {
        super();

        ViewRouter.registerDirective(new ViewRouter(routes));
    }
}