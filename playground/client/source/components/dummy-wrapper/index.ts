import { element }   from "@surface/htmlx-element";
import { DummyBase } from "../dummy-parent/index.js";
import template      from "./index.htmlx";

@element("dummy-wrapper", { template })
export default class DummyParent extends DummyBase
{ }