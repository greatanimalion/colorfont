 export default function compile(code: string,times:number):string{
    let compiledCode = ''
    for(let i = 1; i <= times; i++) {
        compiledCode+=code.replace('$',i.toString()).replace('$',(i*0.1).toFixed(1).toString())+'\n';
    }
  return compiledCode;
}

