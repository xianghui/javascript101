---
title: "2.1 ES6 Enhancements"
---

There are a number of enhancements in the
<a href="https://www.ecma-international.org/ecma-262/" target="_blank">ES6
specification</a> but we will discuss on some of the most commonly used
features. Not all browser will be able to support the ES6 syntax. A useful
website is <a href="https://caniuse.com/" target="_blank">caniuse.com</a> which
lets you see the browser support for various different HTML, CSS, and Javascript
features. For many cases, there are **polyfills** that you can include in order
for older browser to work as expected with the new codes.

> _In web development, a polyfill is code that implements a feature on web
> browsers that do not support the feature. Most often, it refers to a
> JavaScript library that implements an HTML5 web standard, either an
> established standard (supported by some browsers) on older browsers, or a
> proposed standard (not supported by any browsers) on existing browsers._
>
> Source:
> <a href="https://en.wikipedia.org/wiki/Polyfill_(programming)" target="_blank">Wikipedia</a>

## Block-Scoped Variables (Recap)

We have already seen this previously through the use of
[`let` and `const`](/1-4-scoping#code-classlanguage-textletcodecode-classlanguage-textconstcode-keyword).
Basically, we are now able to have variables that are declared with block
scoping `{ }` instead of function scoping.

```javascript
{
  //var1 is only available in this block
  let var1 = 10;
}

//var1 is not available here
console.log(var1); //Error: var1 is not defined
```

## Default Function Parameter Values (Recap)

We have also discussed
[default function parameters previously](/1-3-functions#default-parameter-values).
This is achieved by using the assignment (`=`) syntax.

```javascript
//generate a random integer within a range from
//min (inclusive) to max (exclusive)
//default range: [0, 100)
function generateRandomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//generate 10 random numbers within range of 0 to 100
for (let i = 0; i < 10; i++) {
  console.log(generateRandomInt());
}

//generate 10 random numbers within range of 0 to 1000
for (let i = 0; i < 10; i++) {
  console.log(generateRandomInt(0, 1000));
}
```

In the rest of this section, we will elaborate on the following ES6 syntax:

* [Arrow Functions](/2-2-arrow-functions)
* [String Enhancements](/2-3-string-enhancements)
* [ES6 Class System](/2-4-es-6-class-system)
* [Object Enhancements](/2-5-object-enhancements)
* [Rest and Spread Operators](/2-6-rest-and-spread-operators)
* [Destructuring](/2-7-destructuring)
* [Promises](/2-8-promises)
* [Module System](/2-9-module-system)

<div>
  <div class='text-left'>
    <a href="/1-6-arrays">Prev: 1.6 Arrays</a>
  </div>

  <div class='text-right'>
    <a href="/2-2-arrow-functions">Next: 2.2 Arrow Functions</a>
  </div>
</div>
