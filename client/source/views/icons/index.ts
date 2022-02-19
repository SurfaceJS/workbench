/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unassigned-import
import "@surface/material-design/components/icon";

import HTMLXElement, { element } from "@surface/htmlx-element";
import template                  from "./index.htmlx";

@element("icons-view", { template })
export default class Icons extends HTMLXElement
{ }