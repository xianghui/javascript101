---
title: "1.6 Arrays"
---

## Creating an array

Arrays can be created using `new Array()` or by using the **array literal
notation** (similar to
[object literal notation](/1-5-objects#object-literal-notation) but using `[]`).
We are allowed to have different types of value (e.g. primitive type, objects,
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

Since arrays are really just objects, it is possible to have named indexes.
However, note that JS does not support arrays with named indexes, **so array
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
console.log(array3.length); //1
console.log(array3); //["first"]

array3['123'] = 'blar';
console.log(array3.length); //124
console.log(array3); //["first", empty × 122, "blar"]
```

## Array operations

There are a number of common array methods defined in `Array.prototype`. To see
the whole list of these methods, type `[]` and expand the `__proto__` field in
the developer console. When manipulating with arrays, there are 2 types of
methods - those that modify the array directly, and those that return a new
array.

![](images/array_methods.png 'Array methods')

### Add and remove items

`push()` allows us to add item(s) to the end of the array and `unshift()` allows
us to add item(s) to the start of the array. Both methods modify the array
directly and return the new length of the array.

```javascript
//push() and unshift() modifies the original array directly
var array4 = [0, 1, 2, 3, 4];
array4.push('new item at the back');
array4.unshift('new item at the front');

console.log(array4);
// ["new item at the front", 0, 1, 2, 3, 4, "new item at the back"]
```

`concat()` allows us to combine 2 arrays (or add items to the end of the array)
without modifying the original array.

```javascript
//concat() is used to join 2 or more arrays
var arrayA = [1, 2, 3];
var arrayB = ['a', 'b', 'c'];

//can take more than one array as parameters separated by commas
var combine = arrayA.concat(arrayB);
console.log(combine); //[1, 2, 3, "a", "b", "c"]

//can also supply items instead of array for the parameter
var arrayC = [4, 5, 6];
var arrayD = arrayC.concat('a', 'b', 'c');
console.log(arrayD); //[4, 5, 6, "a", "b", "c"]
```

`pop()` and `shift()` are the opposite of `push()` and `unshift()`. `pop()`
allows us to remove the last element in the array, while `shift()` allows us to
remove the first element in the array. Similarly, both methods modify the
original array.

```javascript
var array5 = ['item1', 'item2', 'item3', 'item4'];
console.log(array5.pop()); //item4
console.log(array5); //["item1", "item2", "item3"]

console.log(array5.shift()); //item1
console.log(array5); //["item2", "item3"]
```

`slice(start, end)` allows us to return a new array with certain parts of an
array. It does not modify the original array.

```javascript
var array6 = ['item1', 'item2', 'item3', 'item4'];

//get items at index 1 and index 2
var array7 = array6.slice(1, 3);

console.log(array7); //["item2", "item3"]
```

There is also a `splice(index, deleteCount, items)` method which allows us to
delete items and add items to the original array. This method will return the
items that have been removed.

```javascript
var array8 = ['item1', 'item2', 'item3'];
var removedItems = array8.splice(1, 1, 'a', 'b', 'c');

console.log(removedItems); //["item2"]
console.log(array8); //["item1", "a", "b", "c", "item3"]

//deleteCount can be 0
//add items to index 3
array8.splice(3, 0, 'x', 'y', 'z');
console.log(array8); //["item1", "a", "b", "x", "y", "z", "c", "item3"]

array8.splice(1, 6, [1, 2, 3]);
console.log(array8); //["item1", Array(3), "item3"]
```

The methods are summarized below:

| Method                              | Description                                                            | Type                                       |
| ----------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| `push(item1, item2, ...)`           | Add 1 or more items to **end**                                         | modifies itself, return new length         |
| `unshift(item1, item2, ...)`        | Add 1 or more items to **start**                                       | modifies itself, return new length         |
| `pop()`                             | Remove **last** item                                                   | modifies itself, returns the removed item  |
| `shift()`                           | Remove **first** item                                                  | modifies itself, returns the removed item  |
| `splice(index, deleteCount, items)` | Remove _deleteCount_ items at index and add _items_ after the deletion | modifies itself, returns the removed items |
| `concat(arr1, arr2, ...)`           | Concatenate one or more arrays                                         | returns the combined array                 |
| `slice(start, end)`                 | Get a slice of the array from _start_ index to _end_ (excluding)       | returns a slice of the array               |

### Iterative methods

In this subsection, we will explore some of the commonly used Array methods for
performing iterative type of operations - `forEach()`, `filter()`, `map()`, and
`reduce()`. These 4 operations take in a **callback function** as the parameter.
This callback function is applied multiple times to each of the elements in the
array.

First up, `forEach()` will iterate through all the elements in the array. For
each element, the callback will be invoked and the current element is supplied
as the first parameter for this callback function.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//define a callback (cb) function
//first parameter of cb is the current element
function callback(item) {
  console.log(item);
}

//forEach takes in a callback function
//the callback function will be invoke 6 times (once for each element)
array1.forEach(callback);
//0, 1, ... 5 (each in a new line)

//another way to do above (more commonly used)
array1.forEach(function(item) {
  console.log(item);
});
```

`filter()` is used to filter away elements in the array. Similarly, a callback
function is supplied for `filter()`, but this callback function has to return a
boolean value indicating whether to **keep this element**.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//filter will return a new array where the elements
//satisfy some conditions define in the cb function
var evenArray = array1.filter(function(item) {
  return item % 2 == 0;
});

console.log(evenArray); //[0, 2, 4]

var largerThan3Array = array1.filter(function(item) {
  return item > 3;
});

console.log(largerThan3Array); //[4, 5]
```

`map()` takes in callback function is supposed to return a value. Similar to
`filter()`, the result is another array which is a "transformed" version of the
original array. Notice that the length of this new array is the same as the
original array.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//filter will return a new array where the elements
//satisfy some conditions define in the cb function
var plus10Array = array1.map(function(item) {
  return item + 10;
});

console.log(plus10Array); //[10, 11, 12, 13, 14, 15]

//note that sometimes we might want to know the index of the item
//the map operation together with the index is often used in
//ReactJS render() method to display list items
var multiplyByIndex = array1.map(function(item, index) {
  return item * index;
});

console.log(multiplyByIndex); //[0, 1, 4, 9, 16, 25]
```

`reduce()` is slightly different from the above 3 other operations. The callback
function takes in **accumulator** and the **currentValue**.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//accumulator - the accumulated values previously returned
//              in the last invocation
//currentValue - current value
function sumReducer(accumulator, currentValue) {
  return accumulator + currentValue;
}

//starting value of accumulator = 0
var sum1 = array1.reduce(sumReducer, 0);

console.log(sum1); //0 + 0 + 1 + 2 + 3 + 4 + 5 = 15

var sum2 = array1.reduce(sumReducer, 10);

console.log(sum2); //10 + 0 + 1 + 2 + 3 + 4 + 5 = 25
```

### Other common methods

Here are the other commonly used array methods. `sort()` and `reverse()` should
be quite indicative of what it can do. Take note that `sort()` sort by
**Unicode** not by the numeric value, but we can supply a comparator in order to
do numeric sorting.

```javascript
var array9 = ['a', 'z', 'p', 'w', 'i'];

//modifies itself
array9.sort();
console.log(array9); //["a", "i", "p", "w", "z"]

var array10 = [100, 15, 0, 1234];
array10.sort();
console.log(array10); //[0, 100, 1234, 15] (not in ascending order!)

array10 = [100, 15, 0, 1234];

//supply a comparator as a function (ascending order)
array10.sort(function(n1, n2) {
  return n1 - n2;
});
console.log(array10); //[0, 15, 100, 1234]

//descending order
array10 = [100, 15, 0, 1234];
array10.sort(function(n1, n2) {
  return n2 - n1;
});
console.log(array10); //[1234, 100, 15, 0]
```

`reverse()` reverse the order of the elements in the array.

```javascript
var array1 = [0, 1, 2, 3, 4, 5];

//modifies itself
array1.reverse();
console.log(array1); //[5, 4, 3, 2, 1, 0]
```

`join()` is the opposite of the `split()` function used for strings (_split a
string into an array using a separator_). `join()` will join all the elements of
an array into a string (each of them separated by a separator if not `,` is
used).

```javascript
var people = ['John', 'Peter', 'Tom'];
console.log(people.join()); //John,Peter,Tom

console.log(people.join(' ')); //John Peter Tom
```

`keys()` returns an `Array Iterator`, which can be used to get the keys/values
of an array.

```javascript
var array11 = ['a', 'b', 'c'];
var iterator = array11.keys();

for (var key of iterator) {
  console.log(key + ' - ' + array11[key]);
  //0 - a
  //1 - b
  //2 - c
}

//another way to work with iterators in JS
for (var key in array11) {
  console.log(key + ' - ' + array11[key]);
  //0 - a
  //1 - b
  //2 - c
}
```
