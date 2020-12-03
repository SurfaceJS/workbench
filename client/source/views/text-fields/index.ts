// eslint-disable-next-line import/no-unassigned-import
import "./components";

import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";
import style                      from "./index.scss";

@element("text-fields-view", template, style)
export default class TextFields extends CustomElement
{ }