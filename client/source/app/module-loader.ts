/**
 * Requires the module of the specified path.
 * @param path Path to the module.
 */
export async function load(path: string): Promise<object>
{
    switch (path)
    {
        case "views/buttons":
            return import(/* webpackChunkName: "views/buttons" */ "../views/buttons");
        case "views/contact":
            return import(/* webpackChunkName: "views/contact" */ "../views/contact");
        case "views/colors":
            return import(/* webpackChunkName: "views/colors" */ "../views/colors");
        case "views/data-table":
            return import(/* webpackChunkName: "views/data-table" */ "../views/data-table");
        case "views/directives":
            return import(/* webpackChunkName: "views/directives" */ "../views/directives");
        case "views/home":
            return import(/* webpackChunkName: "views/home" */ "../views/home");
        case "views/icon":
            return import(/* webpackChunkName: "views/icon" */ "../views/icon");
        case "views/list":
            return import(/* webpackChunkName: "views/list" */ "../views/list");
        case "views/login":
            return import(/* webpackChunkName: "views/login" */ "../views/login");
        case "views/menu":
            return import(/* webpackChunkName: "views/menu" */ "../views/menu");
        case "views/modal":
            return import(/* webpackChunkName: "views/modal" */ "../views/modal");
        case "views/stack-panel":
            return import(/* webpackChunkName: "views/stack-panel" */ "../views/stack-panel");
        case "views/switches":
            return import(/* webpackChunkName: "views/switches" */ "../views/switches");
        default:
            return Promise.reject("path not found");
    }
}