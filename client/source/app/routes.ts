import { IRouteConfig } from "@surface/view-router";

const routes: Array<IRouteConfig> =
[
    { path: "views/contact",     component: async () => await import(/* webpackChunkName: "views/contact" */     "../views/contact"),     },
    { path: "views/data-table",  component: async () => await import(/* webpackChunkName: "views/data-table" */  "../views/data-table"),  },
    { path: "views/directives",  component: async () => await import(/* webpackChunkName: "views/directives" */  "../views/directives"),  },
    { path: "views/home",        component: async () => await import(/* webpackChunkName: "views/home" */        "../views/home"),        },
    { path: "views/icon",        component: async () => await import(/* webpackChunkName: "views/icon" */        "../views/icon"),        },
    { path: "views/list",        component: async () => await import(/* webpackChunkName: "views/list" */        "../views/list"),        },
    { path: "views/login",       component: async () => await import(/* webpackChunkName: "views/login" */       "../views/login"),       },
    { path: "views/menu",        component: async () => await import(/* webpackChunkName: "views/menu" */        "../views/menu"),        },
    { path: "views/modal",       component: async () => await import(/* webpackChunkName: "views/modal" */       "../views/modal"),       },
    { path: "views/stack-panel", component: async () => await import(/* webpackChunkName: "views/stack-panel" */ "../views/stack-panel"), },
];

export default routes;