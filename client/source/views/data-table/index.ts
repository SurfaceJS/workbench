import { FieldsOf } from "@surface/core";
import { element }  from "@surface/custom-element/decorators";
import Enumerable   from "@surface/enumerable";
import View         from "@surface/view";
import template     from "./index.html";
import style        from "./index.scss";

class People
{
    private _id: number = 0;
    public get id(): number
    {
        return this._id;
    }

    public set id(value: number)
    {
        this._id = value;
    }

    private _name: string = "";
    public get name(): string
    {
        return this._name;
    }

    public set name(value: string)
    {
        this._name = value;
    }

    private _email: Object = "";
    public get email(): Object
    {
        return this._email;
    }

    public set email(value: Object)
    {
        this._email = value;
    }

    private _country = new Country();
    public get country(): Country
    {
        return this._country;
    }

    public set country(value: Country)
    {
        this._country = value;
    }

    private _active: boolean = false;
    public get active(): boolean
    {
        return this._active;
    }

    public set active(value: boolean)
    {
        this._active = value;
    }

    public constructor(people?: FieldsOf<People>)
    {
        if (people)
        {
            this.active  = people.active;
            this.country = people.country;
            this.email   = people.email;
            this.id      = people.id;
            this.name    = people.name;
        }
    }
}

class Country
{
    private _name: string = "";
    public get name(): string
    {
        return this._name;
    }

    public set name(value: string)
    {
        this._name = value;
    }

    private _initials: string = "";
    public get initials(): string
    {
        return this._initials;
    }

    public set initials(value: string)
    {
        this._initials = value;
    }

    public constructor(country?: FieldsOf<Country>)
    {
        if (country)
        {
            this.name     = country.name;
            this.initials = country.initials;
        }
    }
}

@element("data-table-view", template, style)
export default class DataTable extends View
{
    private _datasource: Array<People> = [];
    public get datasource(): Array<People>
    {
        return this._datasource;
    }

    public set datasource(value: Array<People>)
    {
        this._datasource = value;
    }

    private _state: boolean = false;
    public get state(): boolean
    {
        return this._state;
    }

    public set state(value: boolean)
    {
        this._state = value;
    }

    public constructor()
    {
        super();
        this.viewName   = "Data table";
        const datasource =
        [
            new People
            ({
                id:    1,
                name:  "foo",
                email: "foo@mail.com",
                country: new Country
                ({
                    name:     "Brazil",
                    initials: "bra"
                }),
                active: true
            }),
            new People
            ({
                id:    2,
                name:  "bar",
                email: "bar@mail.com",
                country: new Country
                ({
                    name:     "United States",
                    initials: "usa"
                }),
                active: false
            }),
            new People
            ({
                id:    3,
                name:  "baz",
                email: "baz@mail.com",
                country: new Country
                ({
                    name:     "England",
                    initials: "eng"
                }),
                active: true
            }),
        ];

        this.datasource = datasource
            .concat(datasource)
            .concat(datasource)
            .concat(datasource)
            .concat(datasource);
    }

    public changeData(): void
    {
        this.datasource[0].name   = "foo-bar";
        this.datasource[0].email  = "foo-bar@gmail";
        this.datasource[0].active = !this.datasource[0].active;
        this.datasource[0].country.name     = "Argentina";
        this.datasource[0].country.initials = "arg";

        this.state = !this.state;
    }

    public max(field: string): string
    {
        return Enumerable.from(this.datasource).max(x => x[field]).toString();
    }

    public average(field: string): string
    {
        return Enumerable.from(this.datasource).average(x => x[field]).toString();
    }
}