// File generated automatically. Don't change.

/**
 * Requires the specified path module.
 * @param path Path to the module.
 */
export function load(path: string): Promise<Object>
{
    switch (path)
    {
        case "views/contact":
            return import(/* webpackChunkName: "views/contact" */ "../views/contact");
        case "views/home":
            return import(/* webpackChunkName: "views/home" */ "../views/home");
        case "views/login":
            return import(/* webpackChunkName: "views/login" */ "../views/login");
        default:
            return Promise.reject("path not found");
    }
}