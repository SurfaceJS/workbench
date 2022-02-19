/* eslint-disable import/extensions */
/* eslint-disable import/no-unassigned-import */
import "@surface/material-design/components/button";
import "@surface/material-design/components/icon";

import HTMLXElement, { element } from "@surface/htmlx-element";
import template                  from "./index.htmlx";
import style                     from "./index.scss";

@element("buttons-view", { style, template })
export default class Buttons extends HTMLXElement
{ }