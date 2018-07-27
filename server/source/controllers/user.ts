import ActionResult      from "@surface/web-host/action-result";
import Controller        from "@surface/web-host/controller";


export class User extends Controller
{
    public getUsers(): ActionResult
    {
        if (this.httpContext.request.method == "GET")
        {
            return super.json(null);
        }
        else
        {
            let data: object[] = [];
            for (let index = 0; index < 100; index += 3)
            {
                data = data.concat
                ([
                    {
                        id:    index + 1,
                        name:  "foo",
                        email: "foo@mail.com",
                        country:
                        {
                            name:     "Brazil",
                            initials: "bra"
                        },
                        active: true
                    },
                    {
                        id:    index + 2,
                        name:  "bar",
                        email: "bar@mail.com",
                        country:
                        {
                            name:     "United States",
                            initials: "usa"
                        },
                        active: false
                    },
                    {
                        id:    index + 3,
                        name:  "baz",
                        email: "baz@mail.com",
                        country:
                        {
                            name:     "England",
                            initials: "eng"
                        },
                        active: true
                    }
                ]);
            }

            return super.json(data);
        }
    }
}