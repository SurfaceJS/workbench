import { Criteria }                 from "@surface/components/data-table/interfaces/data-provider";
import { Func1 }                    from "@surface/core";
import Enumareble                   from "@surface/enumerable";
import { ActionResult, Controller } from "@surface/web-host";

export class User extends Controller
{
    public read(inbound?: Criteria): ActionResult
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

        if (inbound.sorting.length > 0)
        {
            const predicate = inbound.sorting[0].field.includes(".") ?
                Function("x", `return x.${inbound.sorting[0].field}`) as Func1<object, object[keyof object]> :
                (element: object) => element[inbound.sorting[0].field as keyof object];

            sequence = inbound.sorting[0].direction == "asc" ?
                sequence.orderBy(predicate)
                    : sequence.orderByDescending(predicate);
        }

        data = sequence
            .skip(inbound.skip)
            .take(inbound.take)
            .toArray();

        return this.json({ data, total: sequence.count() });
    }
}