import hash from "./hash-cyrb53";
import * as sass from 'sass';

/**
 * This function is used to generate color font
 * @param {Element} el - string or element to generate color font
 * @param {Object} config - The configuration object for color font
*/
export function colorFont(el: Element | string, config:any = {color:['red','green','blue']}) {
    const { color,duration} = config;
    if (typeof el === 'string') el = document.querySelector(el) as Element;
    if (!el) throw new Error('el not found');
    const text: string[] = el.textContent?.trim().split('') as string[];
    el.innerHTML=''
    text.map((e:string)=>{
        const span = document.createElement('span');
        span.textContent = e;
        el.appendChild(span);
    })
    const colorFont = hash(text[0], Date.now());
    const className = "color-font-" + colorFont;
    el.classList.add(className);
    const fontNum = text.length;
    const style = `@for $i from 1 through ${fontNum} {.${className}>span:nth-child($i) {animation-delay:- $i * 0.1s;}}`;
    const elstyle = `.${className}>span{ animation: ${className} ${duration}  infinite alternate slidein;}`
    let colorType=''
    const split=Math.floor(100/fontNum)
    for(let i  =0;i<fontNum;i++){
        colorType+=i*split+`%{color:${color[i]};text-shadow: 0 0 10px ${color[i]},0 0 20px ${color[i]},0 0 30px ${color[i]},0 0 40px ${color[i]};}`
    }
    const animation = `@keyframes ${className} {${colorType}}`;
    let compiled
    try{
         compiled = sass.compileString(style);
    }
    catch(e){
            console.log(e);
            
    }
    document.createElement('style').innerHTML = elstyle + animation + compiled;
    console.log(compiled);
}
