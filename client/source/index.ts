import ViewRouter from "@surface/view-router";
import App        from "./app";
import routes     from "./routes";

let app: App;

const router = new ViewRouter("app-root", routes);

ViewRouter.registerDirective(router);

document.body.appendChild(app = new App());

router.pushCurrentLocation();