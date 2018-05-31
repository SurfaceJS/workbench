// File generated automatically. Don't change.

/**
 * Requires the module of the specified path.
 * @param path Path to the module.
 */
export async function load(path: string): Promise<Object>
{
    switch (path)
    {
        case "views/contact":
            return import(/* webpackChunkName: "views/contact" */ "../views/contact");
        case "views/data-table":
            return import(/* webpackChunkName: "views/data-table" */ "../views/data-table");
        case "views/home":
            return import(/* webpackChunkName: "views/home" */ "../views/home");
        case "views/login":
            return import(/* webpackChunkName: "views/login" */ "../views/login");
        case "views/menu":
            return import(/* webpackChunkName: "views/menu" */ "../views/menu");
        case "views/stack-panel":
            return import(/* webpackChunkName: "views/stack-panel" */ "../views/stack-panel");
        default:
            return Promise.reject("path not found");
    }
}