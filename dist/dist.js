import * as sass from '../node_modules/sass/sass';
console.log(11);

/**
 * cyrb53 hash function
 * @param {string} str - input string
 * @param {number} seed - seed value
*/
const  cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
//   console.log(`cyrb53('a') -> ${cyrb53('a')}`)
//   console.log(`cyrb53('b') -> ${cyrb53('a')}`)
//   console.log(`cyrb53('revenge') -> ${cyrb53('revenge')}`)
//   console.log(`cyrb53('revenue') -> ${cyrb53('revenue')}`)
//   console.log(`cyrb53('revenue', 1) -> ${cyrb53('revenue', 1)}`)
//   console.log(`cyrb53('revenue', 2) -> ${cyrb53('revenue', 2)}`)
//   console.log(`cyrb53('revenue', 3) -> ${cyrb53('revenue', 3)}`)

/**
 * This function is used to generate color font
 * @param {Element} el - string or element to generate color font
 * @param {Object} config - The configuration object for color font
*/
function colorFont(el, config = {color:['red','green','blue']}) {
    const { color,duration} = config;
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) throw new Error('el not found');
    const text = el.textContent.trim().split('');
    text.map(e=>{
        const span = document.createElement('span');
        span.textContent = e;
        el.appendChild(span);
    });
    const colorFont = cyrb53(text[0], Date.now());
    const className = "color-font-" + colorFont;
    el.classList.add(className);
    const fontNum = text.length;
    const style = `@for $i from 1 through ${fontNum} {.${className}>span:nth-child($i) {animation-delay:- $i * 0.1s;}}`;
    const elstyle = `.${className}>span{
    animation: ${className};
    animation-duration: ${duration}s;
    animation-iteration-count: infinite;}`;
    let colorType='';
    const split=Math.floor(100/fontNum);
    for(let i  =0;i<fontNum;i++){
        colorType+=i*split+'%{color:'+color[i]+';}';
    }
    const animation = `@keyframes ${className} {${colorType}}`;
    document.createElement('style').textContent = elstyle + animation + style;
    const compiled = sass.compileString(style);
    console.log(compiled);
    
}

export { colorFont };
