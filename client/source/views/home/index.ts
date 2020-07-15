import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("home-view", template)
export default class Home extends CustomElement
{ }