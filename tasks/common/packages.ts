import path     from "path";
import IPackage from "../../modules/tasks/interfaces/package";

const root  = path.resolve(__dirname, "../../");
const paths =
[
    path.join(root, "client/package.json"),
    path.join(root, "server/package.json")
]

export default paths.map(x => ({ ...require(x), ...{ path: path.resolve(x, "../") }})) as Array<IPackage>;