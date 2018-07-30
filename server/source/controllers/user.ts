import Enumareble        from "@surface/enumerable";
import ActionResult      from "@surface/web-host/action-result";
import Controller        from "@surface/web-host/controller";

type DataTableInbound =
{
    page:     number;
    pageSize: number;
    order:
    {
        field:     string,
        direction: "asc"|"desc"
    }
};

export class User extends Controller
{
    public read(inbound?: DataTableInbound): ActionResult
    {
        if (!inbound)
        {
            throw new Error();
        }

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

        let sequence = Enumareble.from(data);

        if (inbound.order.direction == "asc")
        {
            sequence = sequence.orderBy(x => x[inbound.order.field]);
        }
        else
        {
            sequence = sequence.orderByDescending(x => x[inbound.order.field]);
        }

        data = sequence
            .skip((inbound.page - 1) * inbound.pageSize)
            .take(inbound.pageSize)
            .toArray();

        return super.json(data);
    }
}