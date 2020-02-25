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
        case "views/colors":
            return import(/* webpackChunkName: "views/colors" */ "../views/colors");
        case "views/icons":
            return import(/* webpackChunkName: "views/icons" */ "../views/icons");
        case "views/switches":
            return import(/* webpackChunkName: "views/switches" */ "../views/switches");
        case "views/text-fields":
            return import(/* webpackChunkName: "views/text-fields" */ "../views/text-fields");
        default:
            return Promise.reject("path not found");
    }
}