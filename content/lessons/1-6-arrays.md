---
title: "1.6 Arrays"
---

## Creating an array

Arrays can be created using `new Array()` or using the **array literal
notation** (similar concept to
[object literal notation](/1-5-objects#object-literal-notation)). We are allowed
to have different type of values (e.g. primitive type, objects, functions)
within an array.

```javascript
var array1 = new Array(1, 'item2', false, function() {}, {});

//array literal notation
var array2 = [1, 'item2', ['nested_item1']];

console.log(array1); //[1, "item2", false, ƒ, {…}]
console.log(array2); //[1, "item2", Array(1)]
```

In JS, an array is really just another type of object. To check whether a
variable is an array, we can use the `Array.isArray()` method.

```javascript
console.log(typeof array1); //object
console.log(typeof array2); //object

console.log(Array.isArray(array1)); //true
console.log(Array.isArray(array2)); //true
```
