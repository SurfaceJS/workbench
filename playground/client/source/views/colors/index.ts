import HTMLXElement, { element } from "@surface/htmlx-element";
import { hexToHsla }             from "@surface/material-design";
import template                  from "./index.htmlx";
import style                     from "./index.scss";

@element("colors-view", { style, template })
export default class Colors extends HTMLXElement
{
    private readonly cssVariables = document.head.querySelector<HTMLStyleElement>("#smd-css-variables")!;

    protected readonly colors =
        [
            "primary",
            "secondary",
            "text",
            "background",
            "accent",
            "error",
            "info",
            "success",
            "warning",
        ];

    protected readonly materialColors =
        [
            "red",
            "pink",
            "purple",
            "deep-purple",
            "indigo",
            "blue",
            "light-blue",
            "cyan",
            "teal",
            "green",
            "light-green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "deep-orange",
            "brown",
            "blue-grey",
            "grey",
            "black",
            "white",
        ];

    protected readonly weights =
        [
            "50",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "A100",
            "A200",
            "A400",
            "A700",
        ];

    protected isDark(variable: string): boolean
    {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const color = ((this.cssVariables.sheet as CSSStyleSheet).cssRules[0] as any).styleMap.getAll(variable)?.[0]?.[0]?.trim() ?? "#000000";

        const hsv = hexToHsla(color);

        return hsv.l < 0.5;
    }

    protected getCssVariable(theme: string, name: string, weight?: string): string
    {
        return `--smd-${this.getName(theme, name, weight)}`;
    }

    protected getClass(theme: string, name: string, weight?: string): Record<string, boolean>
    {
        return { "color-swatch": true, dark: this.isDark(this.getCssVariable(theme, name, weight)) };
    }

    protected getName(theme: string, name: string, weight?: string): string
    {
        return [theme, name, weight].filter(x => !!x).join("-");
    }

    protected getStyle(theme: string, name: string, weight?: string): Record<string, string>
    {
        return { "background-color": `var(${this.getCssVariable(theme, name, weight)})` };
    }
}