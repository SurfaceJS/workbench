/* eslint-disable import/extensions */
/* eslint-disable import/no-unassigned-import */
import "@surface/material-design/components/button";
import "@surface/material-design/components/icon";

import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.htmx";
import style                      from "./index.scss";

@element("buttons-view", { style, template })
export default class Buttons extends CustomElement
{ }