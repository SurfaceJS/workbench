/* eslint-disable capitalized-comments */
import { RouteConfiguration } from "@surface/view-router";

const routes: RouteConfiguration[] =
[
    { component: async () => import(/* webpackChunkName: "views/contact" */     "./views/contact"),     path: "/contact" },
    { component: async () => import(/* webpackChunkName: "views/data-table" */  "./views/data-table"),  path: "/data-table" },
    { component: async () => import(/* webpackChunkName: "views/directives" */  "./views/directives"),  path: "/directives" },
    { component: async () => import(/* webpackChunkName: "views/home" */        "./views/home"),        path: "/home" },
    { component: async () => import(/* webpackChunkName: "views/icon" */        "./views/icon"),        path: "/icon" },
    { component: async () => import(/* webpackChunkName: "views/list" */        "./views/list"),        path: "/list" },
    { component: async () => import(/* webpackChunkName: "views/login" */       "./views/login"),       path: "/login" },
    { component: async () => import(/* webpackChunkName: "views/menu" */        "./views/menu"),        path: "/menu" },
    { component: async () => import(/* webpackChunkName: "views/modal" */       "./views/modal"),       path: "/modal" },
    { component: async () => import(/* webpackChunkName: "views/stack-panel" */ "./views/stack-panel"), path: "/stack-panel" },
];

export default routes;