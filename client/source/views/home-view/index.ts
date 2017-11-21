import template          from './index.html';
import { CustomElement } from '@surface/custom-element';
import { define }        from '@surface/custom-element/decorators';

@define('home-view', template)
export default class Home extends CustomElement
{ }