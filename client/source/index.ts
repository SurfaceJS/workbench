import ViewRouter from "@surface/view-router";
import routes     from "./routes";

const router = new ViewRouter("app-root", routes);

ViewRouter.registerDirective(router);

void import("./app").then(() => void router.pushCurrentLocation());