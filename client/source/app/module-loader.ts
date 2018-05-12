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
        case "views/home":
            return import(/* webpackChunkName: "views/home" */ "../views/home");
        case "views/login":
            return import(/* webpackChunkName: "views/login" */ "../views/login");
        case "views/stack-layout":
            return import(/* webpackChunkName: "views/stack-layout" */ "../views/stack-layout");
        default:
            return Promise.reject("path not found");
    }
}