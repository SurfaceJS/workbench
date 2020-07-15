import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("stack-panel-view", template)
export default class StackPanel extends CustomElement
{ }