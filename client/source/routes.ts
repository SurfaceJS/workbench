import { RouteConfiguration } from "@surface/view-router";

const routes: Array<RouteConfiguration> =
[
    { path: "/contact",     component: async () => await import(/* webpackChunkName: "views/contact" */     "./views/contact"),     },
    { path: "/data-table",  component: async () => await import(/* webpackChunkName: "views/data-table" */  "./views/data-table"),  },
    { path: "/directives",  component: async () => await import(/* webpackChunkName: "views/directives" */  "./views/directives"),  },
    { path: "/home",        component: async () => await import(/* webpackChunkName: "views/home" */        "./views/home"),        },
    { path: "/icon",        component: async () => await import(/* webpackChunkName: "views/icon" */        "./views/icon"),        },
    { path: "/list",        component: async () => await import(/* webpackChunkName: "views/list" */        "./views/list"),        },
    { path: "/login",       component: async () => await import(/* webpackChunkName: "views/login" */       "./views/login"),       },
    { path: "/menu",        component: async () => await import(/* webpackChunkName: "views/menu" */        "./views/menu"),        },
    { path: "/modal",       component: async () => await import(/* webpackChunkName: "views/modal" */       "./views/modal"),       },
    { path: "/stack-panel", component: async () => await import(/* webpackChunkName: "views/stack-panel" */ "./views/stack-panel"), },
];

export default routes;