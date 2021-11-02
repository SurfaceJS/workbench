import HTMLXElement                       from "@surface/htmlx-element";
import WebRouter, { RouterLinkDirective } from "@surface/web-router";
import routes                             from "./routes";

const router = new WebRouter({ baseUrl: "app", root: "app-root", routes });

HTMLXElement.registerDirective("to", context => new RouterLinkDirective(router, context));

void import("./app").then(() => void router.pushCurrentLocation());

// window.addEventListener("load", async () => navigator.serviceWorker.register("/app-service-worker.js", { scope: "/" }));
window.addEventListener("load", async () => navigator.serviceWorker.register("/another-service-worker.js", { scope: "/" }));