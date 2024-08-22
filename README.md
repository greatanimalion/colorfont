# 下载
> npm install colorfontcolor 
# 使用方法
```javascript
//cjs环境
const colorfont = require('colorfontcolor');

//es6环境
import colorfont from 'colorfontcolor';
```
   暴露 colorfont函数，可以传入一个字符串选择器或元素，可以传入一个配置选项`ColorFontOptions`。
```js
type ColorFontOptions = {
    openBlur: boolean,//文字边缘模糊开关
    color: string[],//数组，文字颜色
    duration: number,//动画变化周期
    blurRadius: number//文字边缘模程度
}
//配置默认数值
const defaultOptions = {
    openBlur: true,
    color: ['red', 'green', 'blue'],
    duration: 2,
    blurRadius: 10
};
```
# 提示
 不建议color过多，不建议文字过多，否则会导致性能问题。

 # 示例
```javascript
//es6环境,vue组件中使用
<template>
    <div>
        <h1 ref="title">祖国繁荣昌盛</h1>
    </div>
</template>
import colorfont  from 'colorfontcolor';

export default {
    monted() {
        const el = this.$refs.title
        colorfont(el, {
            duration:3,
            blurRadius:5,
            color:['rgb(0, 26, 255)','#ffffff']
            }
        );
    }




}
```
https://github.com/user-attachments/assets/a484ee7c-f1d8-44d5-a4d7-d00c68d2c3bb
