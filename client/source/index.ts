import CustomElement                       from "@surface/custom-element";
import ViewRouter, { RouterLinkDirective } from "@surface/web-router";
import routes                              from "./routes";

const router = new ViewRouter("app-root", routes);

CustomElement.registerDirective("to", context => new RouterLinkDirective(router, context));

void import("./app").then(() => void router.pushCurrentLocation());

window.addEventListener("load", async () => navigator.serviceWorker.register("/service-worker.js"));
window.addEventListener("load", async () => navigator.serviceWorker.register("/another-service-worker.js", { scope: "." }));