
import path              from "path";
import { fileURLToPath } from "url";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("@surface/builder").Configuration} */
const configuration =
{
    clean: false,
    devServer:
    {
        compress:   true,
        hot:        true,
        liveReload: false,
        open:       true,
        port:       1337
    },
    logging: "minimal",
    projects:
    {
        app:
        {
            entry: path.join(DIRNAME, "./source/index.ts"),
            environments:
            {
                production:
                {
                    overrides:
                    [
                        {
                            replace: path.join(DIRNAME, "./source/enviroments/settings.ts"),
                            with:    path.join(DIRNAME, "./source/enviroments/settings.production.ts"),
                        }
                    ],
                    variables:
                    [
                        "USERNAME"
                    ]
                }
            },
            eslint:
            {
                enabled: true
            },
            htmlx:
            {
                attributeHandlers:
                [
                    {
                        attribute: "src",
                        tag:       "app-img",
                        type:      "src"
                    }
                ],
                mode: "aot"
            },
            index:  path.join(DIRNAME, "./index.html"),
            output: path.resolve(DIRNAME, "../server/wwwroot"),
            preferTs:
            [
                path.resolve(DIRNAME, "../**/@surface/**"),
            ],
            target: "web"
        },
        webworker:
        {
            entry:    path.join(DIRNAME, "./source/another-service-worker.ts"),
            filename: "another-service-worker.js",
            output:   path.resolve(DIRNAME, "../server/wwwroot"),
            target:   "webworker"
        }
    },
    hooks:
    {
        configured: async webpackConfiguration =>
        {
            const nodeModules         = path.resolve(DIRNAME, "../node_modules");
            const externalNodeModules = path.resolve(DIRNAME, "../../modules/node_modules");

            webpackConfiguration.resolve.modules =
            [
                ...webpackConfiguration.resolve.modules ?? [],
                nodeModules,
                externalNodeModules,
            ]

            webpackConfiguration.resolveLoader.modules =
            [
                ...webpackConfiguration.resolveLoader.modules ?? [],
                nodeModules,
                externalNodeModules,
            ]

            return webpackConfiguration;
        }
    }
};

export default configuration;