import type { RouteConfiguration } from "@surface/web-router";

const routes: RouteConfiguration[] =
[
    { component: async () => import("./views/buttons/index.js"),     path: "/components/buttons" },
    { component: async () => import("./views/colors/index.js"),      path: "/components/colors" },
    { component: async () => import("./views/data-table/index.js"),  path: "/data-table" },
    { component: async () => import("./views/directives/index.js"),  path: "/directives" },
    { component: async () => import("./views/icons/index.js"),       path: "/components/icons" },
    { component: async () => import("./views/switches/index.js"),    path: "/components/switches" },
    { component: async () => import("./views/text-fields/index.js"), path: "/components/text-fields" },
];

export default routes;
