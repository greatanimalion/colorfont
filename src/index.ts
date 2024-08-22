import hash from "./core/hash-cyrb53";
import compile from "./core/compile";

type ColorFontOptions = {
    openBlur: boolean,
    color: string[],
    duration: number,
    blurRadius: number
}
/**
 * This function is used to generate color font
 * @param {Element} el - string or element to generate color font
 * @param {Object} config - The configuration object for color font
*/

/* color | offset-x | offset-y | blur-radius */
const defaultOptions = {
    openBlur: true,
    color: ['red', 'green', 'blue'],
    duration: 2,
    blurRadius: 10
};
export default function colorFont(el: Element | string,
    options: ColorFontOptions = {
        openBlur: true,
        color: ['red', 'green', 'blue'],
        duration: 2,
        blurRadius: 10
    }) {

    options = { ...defaultOptions, ...options };
    const { color, duration, blurRadius, openBlur } = options;
    console.log(options);

    if (typeof el === 'string') el = document.querySelector(el) as Element;
    if (!el) throw new Error('el not found');
    const text: string[] = el.textContent?.trim().split('') as string[];
    el.innerHTML = ''
    text.forEach((e: string) => {
        const span = document.createElement('span');
        span.textContent = e;
        el.appendChild(span);
    })
    if (!openBlur) return;
    const colorFont = hash(text[0], Date.now());
    const className = "color-font-" + colorFont;
    el.classList.add(className);
    const fontNum = text.length;
    if (fontNum > 7) console.warn('colorfontcolor: 不建议添加过多的文字，可能会导致性能问题');
    const style =`.${className}>span:nth-child($) {animation-delay:- $s;}`;
    const elstyle = `.${className}>span{\n animation: ${className} ${duration}s infinite alternate;\n}\n`
    let colorType = ''
    const split = Math.floor(100 / (color.length - 1))
    for (let i = 0; i < color.length; i++) {
        colorType += (i==color.length-1?100:i * split).toString() + `%{color:${color[i]};text-shadow:${color[i]} 0px 0px ${blurRadius}px;}\n`
        // colorType+=i*split+`%{color:${color[i]};text-shadow: 0 0 1${r}px ${color[i]},0 0 2${r}px ${color[i]},0 0 3${r}px ${color[i]},0 0 4${r}px ${color[i]};}`
    }

    const animation = `@keyframes ${className} {\n${colorType}}\n`;
    let compiled = ''
    try {
        compiled = compile(style,fontNum);
    }
    catch (e) {
        console.log('sass 语法错误，无法解析');
    }
    let excit = document.querySelector('#_--_color-font-style_--_')
    if (!excit) {
        let tag = document.createElement('style')
        tag.setAttribute('type', 'text/css')
        tag.setAttribute('id', '_--_color-font-style_--_')
        tag.innerHTML = elstyle + animation + compiled;
        document.head.appendChild(tag);
    }
    else {
        excit.innerHTML = elstyle + animation + compiled;
    }
}
