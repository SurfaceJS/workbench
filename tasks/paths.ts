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
        source: path.resolve(__dirname, "../modules/source"),
    },
    server:
    {
        root:    path.resolve(__dirname, "../server"),
        package: path.resolve(__dirname, "../server/package.json"),
        source:  path.resolve(__dirname, "../server/source"),
    },
    testRunner:
    {
        root:    path.resolve(__dirname, "../modules/test-runner"),
        package: path.resolve(__dirname, "../modules/test-runner/package.json"),
        source:  path.resolve(__dirname, "../modules/test-runner/source"),
    },
    typeRoot:
    {
        root:    path.resolve(__dirname, "../modules/type-root"),
        package: path.resolve(__dirname, "../modules/type-root/package.json"),
    }
};