import type { RouteConfiguration } from "@surface/web-router";

const routes: RouteConfiguration[] =
[
    { component: () => import("./views/buttons"),     path: "/buttons" },
    { component: () => import("./views/colors"),      path: "/colors" },
    { component: () => import("./views/data-table"),  path: "/data-table" },
    { component: () => import("./views/directives"),  path: "/directives" },
    { component: () => import("./views/icons"),       path: "/icons" },
    { component: () => import("./views/switches"),    path: "/switches" },
    { component: () => import("./views/text-fields"), path: "/text-fields" },
];

export default routes;