// eslint-disable-next-line import/no-unassigned-import
import "./components.js";

import HTMLXElement, { element } from "@surface/htmlx-element";
import template                  from "./index.htmlx";
import style                     from "./index.scss";

@element("switches-view", { style, template })
export default class Switches extends HTMLXElement
{ }
