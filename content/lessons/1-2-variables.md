---
title: "1.2 Variables"
---

## Variable declaration and assignment

Variables are declared using the `var` keyword. JS is dynamically typed (i.e.
type of variables can change at run time). For example, you can assign an
integer to a variable and along the way assign a string to the same variable
(thus changing the type of the variable to string type). The `typeof` is a
special operator for getting the type of a variable (in string format).

```javascript
var a = 5;
console.log(a + ' ' + typeof a); //5 number
a = 'hello';
console.log(a + ' ' + typeof a); //hello string

//declare multiple variables
var n1, n2;
```

## Data types

JS has 6 primitive data types: `undefined`, `null`, `number`, `string`,
`boolean`, and `symbol`. You can choose to enclose strings with single quotes
(`'`) or double quotes (`"`). There is also the `object` type for complex type.
You can also assign functions to a variable.

```javascript
typeof 1; //number
typeof 1.12; //number
typeof 'Tom'; //string
typeof true; //boolean
String(1234); //"1234"
typeof String(1234); //string

typeof { name: 'John' }; //object
typeof [1, 2, 3]; //object
typeof new Date(); //object

var f = function() {};
typeof f; //function
```

## Undefined vs Not defined

Other than assigning proper values to a variable, there are also other special
values (`null`, `undefined`, `not defined` ) in Javascript. Note that
**undefined** is not the same as **not defined**. Undefined is when a variable
is declared but not assigned any value. Whereas, if you try to access a variable
that is not declared, an error is thrown indicating that the variable is not
defined (or not declared).

```javascript
var c = null;
console.log(c + ' ' + typeof c); //null object

var b; //same as b = undefined
console.log(b + ' ' + typeof b); //undefined undefined
console.log(d + ' ' + typeof d); //Error: d is not defined

undefined + 'abc'; //"undefinedabc"
undefined + '1'; //undefined1

typeof (undefined + 'abc'); //string
```

## Auto type conversion

Javascript does auto type conversion when you assign a value to a variable. It
tries its best to determine the type of your variable/expression. JS also
performs type coercion when an expression contains multiple types.

```javascript
1 / 10; //0.1
0.9 + 0.1; //1

1 / '10'; //0.1
'10' * '2'; //20

1 + '10'; //"110"
'10' + 1; //"101"
+'10' + 1; //11
'123' - 3; //120

1 + true; //2
true + 'hello'; //"truehello"

Number('100') + 200; //300
Number(' '); //0 (same as Number(""))
```

Like with most programming languages, when handling numeric arithmetic, NaN
(**N**ot **a** **N**umber) and Infinity cases are usually quite weird.

```javascript
undefined + 1; //NaN
typeof NaN; // number

1 / 0; //Infinity
typeof (1 / 0); //number
typeof Infinity; //number

1 / 0 - 1; //Infinity
Infinity - Infinity; //NaN
Infinity + Infinity; //Infinity
Infinity * Infinity; //Infinity
Infinity / Infinity; //NaN
```

<div>
  <div class='text-left'>
    <a href="/1-1-basics">Prev: 1.1 Basics</a>
  </div>

  <div class='text-right'>
    <a href="/1-3-functions">Next: 1.3 Functions</a>
  </div>
</div>
