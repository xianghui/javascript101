---
title: "1.6 Arrays"
---

## Creating an array

Arrays can be created using `new Array()` or using the **array literal
notation** (similar to
[object literal notation](/1-5-objects#object-literal-notation) but using `[]`).
We are allowed to have different type of values (e.g. primitive type, objects,
functions) within an array.

```javascript
var array1 = new Array(1, 'item2', false, function() {}, {});

//array literal notation
var array2 = [1, 'item2', ['nested_item1']];

console.log(array1); //[1, "item2", false, ƒ, {…}]
console.log(array2); //[1, "item2", Array(1)]
```

In JS, an array is really just an object. To check whether a variable is an
array, we can use the `Array.isArray()` method.

```javascript
console.log(typeof array1); //object
console.log(typeof array2); //object

console.log(Array.isArray(array1)); //true
console.log(Array.isArray(array2)); //true
```

## Access elements in arrays

Similar to Java, we use `[]` and an index number to access the elements in an
array. However, if we try to access an out of range index, **undefined** will be
returned instead of getting an error.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//access the 2nd element
console.log(array1[1]); //1

//modify the 4th element
array1[3] = 'fourth';
console.log(array1); //[0, 1, 2, "fourth", 4, 5]

console.log(array1[100]); //undefined
```

```javascript
//iterating through the array
var array1 = [0, 1, 2, 3, 4, 5];
for (let i = 0; i < array1.length; i++) {
  console.log(array1[i]); //0, 1, ... 5 (each in a new line)
}

//another way to iterate through an array (to be further elaborated later)
array1.forEach(function(item) {
  console.log(item); //0, 1, ... 5 (each in a new line)
});
```

Since arrays are really objects, it is possible to have named indexes. However,
note that JS does not support arrays with named indexes, **so array
properties/methods might not work as expected**.

```javascript
var array2 = [];

array2['first'] = 1;
array2['second'] = 2;
console.log(array2); //[first: 1, second: 2]

console.log(array2.length); //0 instead of 2

array2.push('item1');
console.log(array2); //[first: 1, second: 2]
console.log(array2.length); //1

for (let i = 0; i < array2.length; i++) {
  console.log(array2[i]); //item1
}

//another way to iterate through an array (to be further elaborated later)
array2.forEach(function(item) {
  console.log(item); //item1 (there is no 1 and 2)
});
```

The index number must be an integer that is either 0 or a positive value. Take
note that as JS will attempt to perform type coercion, a string that could be
converted to a valid index number is still valid. JS does not complain if the
index number does not continue from its last index number. It will still allow
us to do it and the `length` property will be updated to the larger index
number + 1.

```javascript
var array3 = [];
array3['0'] = 'first';
console.log(array3.length); // 1
console.log(array3); // ["first"]

array3['123'] = 'blar';
console.log(array3.length); // 124
console.log(array3); // ["first", empty × 122, "blar"]
```

## Array operations

There are a number of common array methods defined in `Array.prototype`. To see
the whole list of these methods, type `[]` and expand the `__proto__` field in
the developer console.

![](images/array_methods.png 'Array methods')
