import { CustomElement } from '@surface/custom-element';
import { component }     from '@surface/custom-element/decorators';

import template from "index.html";
import style    from "index.scss";

@component('app-root', template, style)
export class App extends CustomElement
{
    public constructor()
    {
        super();
        console.log("working!!!");
    }
}