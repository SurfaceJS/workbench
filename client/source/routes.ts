import type { RouteConfiguration } from "@surface/view-router";

const routes: RouteConfiguration[] =
[
    { component: async () => import("./views/contact"),     path: "/contact" },
    { component: async () => import("./views/data-table"),  path: "/data-table" },
    { component: async () => import("./views/directives"),  path: "/directives" },
    { component: async () => import("./views/home"),        path: "/home" },
    { component: async () => import("./views/icon"),        path: "/icon" },
    { component: async () => import("./views/list"),        path: "/list" },
    { component: async () => import("./views/login"),       path: "/login" },
    { component: async () => import("./views/menu"),        path: "/menu" },
    { component: async () => import("./views/modal"),       path: "/modal" },
    { component: async () => import("./views/stack-panel"), path: "/stack-panel" },
];

export default routes;