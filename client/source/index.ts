import ViewRouter from "@surface/view-router";
import { App } from "./app";
import routes  from "./routes";

const router = new ViewRouter("app-root", routes);
ViewRouter.registerDirective(router);

document.body.appendChild(new App());

router.push(window.location.pathname + window.location.search + window.location.hash);