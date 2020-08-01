import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("contact-view", template)
export default class Contact extends CustomElement
{ }