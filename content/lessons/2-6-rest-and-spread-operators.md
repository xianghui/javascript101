---
title: "2.6 Rest and Spread Operators"
---

ES6 comes with a powerful and useful operator call the **rest/spread operator**
denoted by `...`.

## Rest Operator

It allows us to match and group up function arguments into an array. The idea is
quite intuitive after seeing an example. Suppose we have the following problem
where we want to define a `sum` function which can take in numeric values and
return the sum of all of them.

```javascript
function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(1, 2, 3)); //6

//unfortunately, this function only works for the case where
//3 values are supplied
console.log(sum(1, 2, 3, 4)); //6

//does not even work for 2 argument case
console.log(sum(10, 20)); //NaN
```

It turns out that JS provides a special object (`arguments`) that is accessible
in the function by which we can get the list of all the arguments in a function
invocation. So in order to solve the above problem, we could instead do this:

```javascript
function sum1() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  return sum;
}

console.log(sum1(1, 2, 3, 4)); //10
console.log(sum1(10, 20)); //30
```

While the above program is totally valid JS codes, the code is not so
readable/intuitive to a programmer (who is reading someone else's codes). ES6
comes with the **rest operator** that can make the codes more readable.

```javascript
function sum2(...values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
}

console.log(sum2(1, 2, 3, 4)); //10
console.log(sum2(10, 20)); //30
```

Now, it is more obvious that the function `sum2` is supposed to take in one or
more values. The syntax for the rest operator consists of `...` and an
**variable name**. The arguments are now accessible by the **variable name** as
an array. Another difference between using the rest operator as oppose to
`arguments` is that the rest operator can match by the position rather than
giving all the arguments like in the case of `arguments`.

```javascript
//method to return a greetings
function generateGreeting(name, gender, ...items) {
  let title;
  if (gender === 'M') {
    title = 'Hi! Mr';
  } else {
    title = 'Hi! Ms';
  }

  if (items.length > 0) {
    return `${title} ${name} has ${items}`;
  } else {
    return `${title} ${name}`;
  }
}

console.log(generateGreeting('John', 'M', 'iPad', 'iPhone'));
//Hi! Mr John has iPad,iPhone

console.log(generateGreeting('Jane', 'F'));
//Hi! Ms Jane
```

Notice that `items` can be used to group all the arguments after the second
arguments (probably the reason why it was given the name **rest** - i.e. rest of
the arguments). The function is also more readable. Of course, we could have
just supplied an array of items instead of calling the function with multiple
arguments.

#### The rest operator is used to group up the rest of the arguments

As mention above, one way to look at the rest operator is to think of it as a
way to group up the **rest of the arguments** that we have in the function. What
this means is that there should not be any arguments after the rest operator. JS
will complain that there is a syntax error if we do that.

```javascript
//SyntaxError: Rest parameter must be last formal parameter
function foo(a, b, ...c, d){
  //...
}
```

## Spread Operator

There is also a **spread operator** which essentially does the opposite. It is
sometimes used together with the rest operator but the **spread operator** can
be used in more scenarios:

#### Array Literal

The spread operator can allow us to access and manipulate all the values from
arrays rather that explicitly access using indexing.

```javascript
//normally can't concat 2 arrays with just arrays
var array1 = [1, 2, 3];
var array2 = ['a', 'b', 'c'];

var combine = [array1, array2];
console.log(combine);
//[[1, 2, 3], ['a', 'b', 'c']]

//if want to do that, need to use concat()
var flattenCombine = array1.concat(array2);
console.log(flattenCombine);
//[1, 2, 3, "a", "b", "c"]
```

```javascript
var array1 = [1, 2, 3];
var array2 = ['a', 'b', 'c'];

//now possible to combine 2 arrays using the
//spread operator (concat/prepend cases)
var flattenCombineSpread = [...array1, ...array2];
console.log(flattenCombineSpread);
//[1, 2, 3, 'a', 'b', 'c']
```

```javascript
var array1 = [1, 2, 3];

//combine the elements of an array with other items
var combine2 = [0, ...array1, 'd'];
console.log(combine);
//[0, 1, 2, 3, 'd']
```

```javascript
var array1 = [1, 2, 3];
var array2 = ['a', 'b', 'c'];

//possible to have multiple spread operators
var flattenCombineSpread2 = [0, ...array1, ...array2, 'd'];
console.log(flattenCombineSpread2);
//[0, 1, 2, 3, "a", "b", "c", "d"]
```

```javascript
//copying/cloning array
var array1 = [1, 2, 3];

var array1CopySlice = array1.slice();
console.log(array1CopySlice);
//[1, 2, 3]

//now with spread operator
var array1Copy = [...array1];
console.log(array1Copy);
//[1, 2, 3]
```

##### Convert "array-like" objects to array

```javascript
//get all <p> tag
const allPara = document.querySelectorAll('p');

//seems to be array but take a look at the __proto__ property
//__proto__: NodeList
//not array!
console.log(allPara);

//2 ways to convert to array

//1) Using Array.from()
//now take a look at the __proto__ property
//__proto__: Array(0)
const allParaArr1 = Array.from(allPara);
console.log(allParaArr1);

//2) Using spread + array literal
//now take a look at the __proto__ property
//__proto__: Array(0)
const allParaArr2 = [...allPara];
console.log(allParaArr2);
```

##### Function Call

Rather than explicitly supply the function parameters one by one, the **spread
operator** allows us to spread out the values from an array as function
parameters in function invocations.

```javascript
var nums = [1, 2, 3, 4];

function sum2(...values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
}

console.log(sum2(...nums));
//same as:
//console.log(sum2(1, 2, 3, 4));
//10
```

```javascript
//possible to get inputs from multiple arrays
var nums1 = [1, 2];
var nums2 = [3, 4];

function sum2(...values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
}

console.log(sum2(...nums1, ...nums2));
//same as:
//console.log(sum2(1, 2, 3, 4));
//10
```

```javascript
//can use together with explicit arguments
var nums1 = [1, 2];
var nums2 = [4, 5];

function sum2(...values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
}

console.log(sum2(...nums1, 3, ...nums2));
//same as:
//console.log(sum2(1, 2, 3, 4, 5));
//15
```

#### Object Literal

The spread operator also works for object literals. We can spread out the
key-values from an object into another object. Same idea as with the array
literals, we can access the object property-values directly rather than having
to do indexing or calling `.property`. By using the spread operator, we can add
on additional properties.

```javascript
var personName = { firstName: 'John', lastName: 'Doe' };
var personContact = { mobile: '91234567' };

var person = { ...personName, ...personContact };
console.log(person);
//{firstName: "John", lastName: "Doe", mobile: "91234567"}
```

It can also be to override/replace existing properties.

```javascript
var person = { firstName: 'John', lastName: 'Doe', mobile: '91234567' };
var newContact = { mobile: '123456789' };

person = { ...person, ...newContact };
console.log(person);
//{firstName: "John", lastName: "Doe", mobile: "123456789"}
```

The order by which the spread operator is used in object literals matters as the
ones on the right side will override the ones on the left side (and also add new
properties).

```javascript
var person = { firstName: 'John', lastName: 'Doe', mobile: '91234567' };
var contactDetails1 = { mobile: '123456789' };
var contactDetails2 = { email: '123456789' };
var contactDetails3 = { mobile: '012345678' };

person = {
  ...person,
  ...contactDetails1,
  ...contactDetails2,
  ...contactDetails3
};
console.log(person);
//{firstName: "John", lastName: "Doe", mobile: "012345678", email: "123456789"}
```

#### Others

There are also other situations where the spread operators can be used. For
example, getting the individual characters of a string as an array:

```javascript
var s = 'hello';
var chars = [...s];
console.log(chars);
//["h", "e", "l", "l", "o"]
```

<div>
  <div class='text-left'>
    <a href="/2-5-object-enhancements">Prev: 2.5 Object Enhancements</a>
  </div>

  <div class='text-right'>
    <a href="/2-7-destructuring">Next: 2.7 Destructuring</a>
  </div>
</div>
