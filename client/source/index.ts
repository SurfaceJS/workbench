import CustomElement from "@surface/custom-element";
import ViewRouter    from "@surface/web-router";
import routes        from "./routes";

const router = new ViewRouter("app-root", routes);

CustomElement.registerDirective("to", router.asDirective());

void import("./app").then(() => void router.pushCurrentLocation());

window.addEventListener("load", async () => navigator.serviceWorker.register("/service-worker.js"));
window.addEventListener("load", async () => navigator.serviceWorker.register("/another-service-worker.js", { scope: "." }));