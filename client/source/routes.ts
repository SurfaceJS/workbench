import type { RouteConfiguration } from "@surface/web-router";

const routes: RouteConfiguration[] =
[
    { component: async () => import("./views/buttons"),     path: "/components/buttons" },
    { component: async () => import("./views/colors"),      path: "/components/colors" },
    { component: async () => import("./views/data-table"),  path: "/data-table" },
    { component: async () => import("./views/directives"),  path: "/directives" },
    { component: async () => import("./views/icons"),       path: "/components/icons" },
    { component: async () => import("./views/switches"),    path: "/components/switches" },
    { component: async () => import("./views/text-fields"), path: "/components/text-fields" },
];

export default routes;