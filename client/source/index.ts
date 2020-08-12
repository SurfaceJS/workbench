import ViewRouter from "@surface/view-router";
import App        from "./app";
import routes     from "./routes";

let app: App;

const router = new ViewRouter(() => app, routes);

ViewRouter.registerDirective(router);

document.body.appendChild(app = new App());

void router.pushCurrentLocation();