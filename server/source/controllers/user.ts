import { Func1 }    from "@surface/core";
import Enumareble   from "@surface/enumerable";
import ActionResult from "@surface/web-host/action-result";
import Controller   from "@surface/web-host/controller";

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

        const predicate = inbound.order.field.includes(".") ?
            Function("x", `return x.${inbound.order.field}`) as Func1<object, object[keyof object]> :
            (element: object) => element[inbound.order.field as keyof object];

        sequence = inbound.order.direction == "asc" ?
            sequence.orderBy(predicate)
                : sequence.orderByDescending(predicate);

        data = sequence
            .skip((inbound.page - 1) * inbound.pageSize)
            .take(inbound.pageSize)
            .toArray();

        return super.json({ data, total: sequence.count() });
    }
}