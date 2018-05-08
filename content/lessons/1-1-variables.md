---
title: "1.1 Variables"
---

## Variable declaration and assignment

Variables are declared using the `var` keyword. JS is dynamically typed (i.e.
type of variables can change at run time). For example, you can assign an
integer to a variable and along the way assign a string to the same variable
(thus changing the type of the variable to string type).

```javascript
var a = 5;
console.log(a + ' ' + typeof a); //5 number
a = 'hello';
console.log(a + ' ' + typeof a); //hello string
```

## Special values

Other than assigning proper values to a variable, there are also other special
values (`undefined`, `null`, `not defined`) in Javascript.

```javascript
var b; //same as b = undefined
console.log(b + ' ' + typeof b); //undefined undefined
var c = null;
console.log(c + ' ' + typeof c); //null object
console.log(d + ' ' + typeof d); //Error: d is not defined
```
