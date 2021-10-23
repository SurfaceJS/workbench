/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unassigned-import
import "@surface/material-design/components/icon";

import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.htmx";

@element("icons-view", { template })
export default class Icons extends CustomElement
{ }