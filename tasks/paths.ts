import path from "path";

export default
{
    client:
    {
        root:    path.resolve(__dirname, "../client"),
        package: path.resolve(__dirname, "../client/package.json"),
        source:  path.resolve(__dirname, "../client/source"),
    },
    modules:
    {
        root:    path.resolve(__dirname, "../modules"),
        source:  path.resolve(__dirname, "../modules/source"),
        package: path.resolve(__dirname, "../modules/package.json"),
    },
    server:
    {
        root:    path.resolve(__dirname, "../server"),
        package: path.resolve(__dirname, "../server/package.json"),
        source:  path.resolve(__dirname, "../server/source"),
    }
};