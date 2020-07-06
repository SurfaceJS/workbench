import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("modal-view", template)
export default class Modal extends CustomElement
{ }