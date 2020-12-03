import { RouteConfiguration } from "@surface/view-router";

const routes: RouteConfiguration[] =
[
    { component: async () => import("./views/buttons"),     path: "/buttons" },
    { component: async () => import("./views/colors"),      path: "/colors" },
    { component: async () => import("./views/icons"),       path: "/icons" },
    { component: async () => import("./views/switches"),    path: "/switches" },
    { component: async () => import("./views/text-fields"), path: "/text-fields" },
];

export default routes;