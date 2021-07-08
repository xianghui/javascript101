---
title: "2.9 Module System"
---

## Module System

Often when building a webapp, codes are not just written in one js file, but
rather organized into modules like how we would do in other programming
languages. For example, Java has classes and packages written in different .java
file.

Previously, if we would want to do that in JS, we would most likely use an
external library (e.g.
<a href="http://requirejs.org" target="_blank">RequireJS</a> or the `require()`
statement for the case of using NodeJS) to achieve similar idea.

ES6 comes with built-in support for module system using the `export` and
`import` syntax. This is often used in
<a href="https://reactjs.org/" target="_blank">ReactJS</a> and
<a href="https://angular.io/" target="_blank">Angular</a> applications during
the development process. The codes are then **transpiled** (i.e. converted to
another form) that probably uses a module loader library like
<a href="http://requirejs.org" target="_blank">RequireJS</a> so that it is
compatible with most web browsers. Reason of doing this is because most web
browsers still do not support the ES6 module system totally.

For the purpose of our discussion, we will mainly be using
<a href="https://codesandbox.io/" target="_blank">CodeSandbox</a> which provides
pre-setup environments ready to be used for development. To try out the
concepts, you can click on any of the "Edit on CodeSandbox" link below and edit
the codes if you want.

The following is a simple example of how ES6 module system works.

<iframe src="https://codesandbox.io/embed/64p63m57qr?autoresize=1&expanddevtools=1&hidenavigation=1" style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Assume that we have a module (`math.js`) which comes with mathematical related
operations. The main program (`index.js`) can import `math.js` and use the
functions in the module. This is in the nutshell what module system is all
about.

## Export

Before we can use any variables, functions, objects, arrays, or classes from a
module, we need to `export` the values explicitly in the module file
(`math.js`). These values can be exported as (multiple) named exports or as a
single default export.

#### Named Exports

Named exports are names used to refer to the value. For example, `math.js`
exported a number of named exports (`sum()`, `subtract()`, `divide()`, and
`multiply()`).

```javascript
//math.js
export function sum(n1, n2) {
  return n1 + n2;
}

export function subtract(n1, n2) {
  return n1 - n2;
}

export function divide(n1, n2) {
  return n1 / n2;
}

export function multiply(n1, n2) {
  return n1 * n2;
}
```

```javascript
//more ways to export values

//variables
export var a = 10;
export let b = 20;
export const c = 30;

//functions
export function sum(n1, n2) {
  return n1 + n2;
}

export const subtract = (n1, n2) => {
  return n1 - n2;
};

//objects
export const someObject = {
  name: 'John',
  age: 20
};

//arrays
export const someArray = [1, 2, 3];

//classes
export class Person {}

//possible to rename named exports
function multiply(n1, n2) {
  return n1 * n2;
}
export { multiply as times };
```

<iframe src="https://codesandbox.io/embed/x3j6167kxo?expanddevtools=1&hidenavigation=1" style="width:100%; height:870px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

```javascript
//The following named exports not allowed
const d = 10;
export d;

function foo(){}
export foo;

export someObject1 = {
  name: "John",
  age: 20
};

export someArray1 = [1,2,3];

class Person {}
export Person;
export const Person;
```

#### Single Default Export

It is also possible to define a default value that exported by using the
`default` keyword. What this means is the when it is imported later on without a
name, this will be the default value to be imported.

```javascript
//math.js
export default function sum(n1, n2) {
  return n1 + n2;
}
```

<iframe src="https://codesandbox.io/embed/93pro7wy9y?expanddevtools=1&hidenavigation=1" style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Other ways of doing default export include the following.

```javascript
export default class Person {}
```

```javascript
//declare class first
class Person {}
export default Person;
```

```javascript
//declare a function first
function sum(n1, n2) {
  return n1 + n2;
}

//default export of the function
export default sum;
```

```javascript
//export object
export default {
  prop1: 1,
  sum: (n1, n2) => n1 + n2
};
```

```javascript
//declare and define the object first
const obj = {
  prop1: 1,
  sum: (n1, n2) => n1 + n2
};

//default export of the object
export default obj;
```

```javascript
//export values as expression
export default 'blar';
```

## Import

`import` is really just the opposite of `export`. Since **imports are hoisted**,
they should most likely be on the top of the file rather than appearing in the
middle of the program (for better readability). Note that imports (and exports)
must be **at the top level**.

```javascript
//not allowed
if (some_condition){
  import 'foo'; //SyntaxError

  //same for export
  export default 'blar';  //SyntaxError
}

//not allowed
{
  import 'foo'; //SyntaxError

  //same for export
  export default 'blar';  //SyntaxError
}
```

#### Importing Named Exports

To import named exports, we use `import { name_export } from 'MODULE_NAME'`
syntax. `MODULE_NAME` can be either relative paths (e.g. `'./lib'` - we can omit
`.js`) or a package name (e.g. for modules installed using the Node Package
Manager, NPM - in which case, there will not be any `./`).

```javascript
//lib.js
export const a = 10;

//main.js
import { a } from './lib';
console.log(b); //10
```

While the syntax looks quite similar to [destructuring](/2-7-destructuring)
syntax, there are some slight differences. For example, if we want to import a
value from a module but rename it to something identifier name, we have to use
`as` rather than `:`.

```javascript
//incorrect way
//lib.js
export const a = 10;

//main.js
import { a : b } from './lib';  //SyntaxError
console.log(b); //10
```

```javascript
//correct way
//lib.js
export const a = 10;

//main.js
import { a as b } from './lib.js';
console.log(b); //10
```

*Note that if we are using the `require()` keyword to include an external library (mostly used for NodeJS apps), then renaming syntax is similar to destructuring.

```javascript
//case for export/import using require()
//database.js
module.exports = {
  fetch: () => {
    //...
  }
}

//main.js
const {
  fetch: fetchData //this syntax is ok
} = require("./database.js")
```

```javascript
//math.js
export default {
  add: (n1, n2) => {
    return n1 + n2
  }
}

//main.js
import { add } from './math'; //not allowed!

```


```javascript
//invalid - no destructuring
//lib.js
export const person = {
  name: 'John',
  age: 20
};

//main.js
import { person: { name } } from "./math";  //SyntaxError
console.log(name);
```

There is support for wildcard naming using `*` which allows us to import all the
named exports from a module.

```javascript
//math.js
export function sum(n1, n2) {
  return n1 + n2;
}

export function subtract(n1, n2) {
  return n1 - n2;
}

export function divide(n1, n2) {
  return n1 / n2;
}

export function multiply(n1, n2) {
  return n1 * n2;
}

//main.js
import * as math from './math';
console.log(math.sum(1, 2)); //3
```

```javascript
//this is not allowed
import * from './math'; //SyntaxError
console.log(sum(1, 2));
```

#### Importing Default Export

Default export like the name suggests means that we can import without supplying
the name of the export (since there is really no name for the export). We can
give it any name during the importing.

```javascript
//lib.js
class Person {}
export default Person;

//main.js
//can give it any name
import SomeClass from './math';
```

Possible to have both named exports and default export at the same time.

```javascript
//lib.js
class Person {}
export default Person;
export function sum(n1, n2) {
  return n1 + n2;
}

//main.js
//can give it any name
import SomeClass, { sum } from './lib';
```

To import a library which is installed using `npm install XXX` (library should
be found in the **node_modules** folder), we just need to specify the library
name (same name as the folder name in node_modules) without `./`. `./` can be
thought of as specifying that we are trying to use relative paths.

```javascript
//assume we have already done this previously:
//npm install moment
import moment from 'moment';

const tomorrow = moment()
  .add(1, 'days')
  .format('MMM DD YYYY');

console.log(`Tomorrow is ${tomorrow}`);
//e.g.
//Tomorrow is Jun 27 2018
```

*Note that if we are not allowed to perform destructuring on a default export which happens to be an object.*

```javascript
//math.js
export default {
  add: (n1, n2) => {
    return n1 + n2
  }
}

//main.js
import { add } from './math'; //not allowed!
//again we can do this for module.exports
//(check the example above)

```


<div>
  <div class='text-left'>
    <a href="/2-8-promises">Prev: 2.8 Promises</a>
  </div>

  <div class='text-right'>
    <a href="/3-1-ajax">Next: 3.1 AJAX</a>
  </div>
</div>
