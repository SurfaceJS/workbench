import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("login-view", template)
export default class Login extends CustomElement
{ }