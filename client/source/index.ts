import CustomElement from "@surface/custom-element";
import ViewRouter    from "@surface/view-router";
import routes        from "./routes";

const router = new ViewRouter("app-root", routes);

CustomElement.registerDirective(ViewRouter.createDirectiveRegistry(router));

void import("./app").then(() => void router.pushCurrentLocation());