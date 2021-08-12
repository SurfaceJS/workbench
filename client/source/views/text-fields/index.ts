/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unassigned-import
import "@surface/material-design/components/text-field";

import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("text-fields-view", { style, template })
export default class TextFields extends CustomElement
{ }