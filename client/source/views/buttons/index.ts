// eslint-disable-next-line import/no-unassigned-import
import "./components";

import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("buttons-view", template, style)
export default class Buttons extends CustomElement
{ }