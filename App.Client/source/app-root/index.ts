import { CustomElement } from '@surface/custom-element';
import { component }     from '@surface/custom-element/decorators';

import lazyLoader from '@surface/lazy-loader';

import template from "index.html";
import style    from "index.scss";

@component('app-root', template, style)
export class App extends CustomElement
{
    public constructor()
    {
        super();
        console.log("working!!!");
        let foo = lazyLoader('views/home-view');
        foo.then(x => console.log(x));
    }
}