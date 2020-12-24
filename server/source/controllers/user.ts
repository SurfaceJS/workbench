import type { Delegate }     from "@surface/core";
import Enumareble            from "@surface/enumerable";
import type { ActionResult } from "@surface/web-host";
import { Controller }        from "@surface/web-host";

export default class User extends Controller
{

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public read(inbound?: any): ActionResult
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
                    active:  true,
                    country:
                    {
                        initials: "bra",
                        name:     "Brazil",
                    },
                    email:   "foo@mail.com",
                    id:      index + 1,
                    name:    "foo",
                },
                {
                    active:  false,
                    country:
                    {
                        initials: "usa",
                        name:     "United States",
                    },
                    email:   "bar@mail.com",
                    id:      index + 2,
                    name:    "bar",
                },
                {
                    active:  true,
                    country:
                    {
                        initials: "eng",
                        name:     "England",
                    },
                    email:   "baz@mail.com",
                    id:      index + 3,
                    name:    "baz",
                },
            ]);
        }

        let sequence = Enumareble.from(data);

        if (inbound.sorting.length > 0)
        {
            const predicate = inbound.sorting[0].field.includes(".")
                // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
                ? Function("x", `return x.${inbound.sorting[0].field}`) as Delegate<[object], object[keyof object]>
                : (element: object) => element[inbound.sorting[0].field as keyof object];

            sequence = inbound.sorting[0].direction == "asc"
                ? sequence.orderBy(predicate)
                : sequence.orderByDescending(predicate);
        }

        data = sequence
            .skip(inbound.skip)
            .take(inbound.take)
            .toArray();

        return this.json({ data, total: sequence.count() });
    }
}