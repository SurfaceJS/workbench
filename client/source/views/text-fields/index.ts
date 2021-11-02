/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unassigned-import
import "@surface/material-design/components/text-field";

import HTMLXElement, { element } from "@surface/htmlx-element";
import template                   from "./index.htmlx";
import style                      from "./index.scss";

@element("text-fields-view", { style, template })
export default class TextFields extends HTMLXElement
{ }