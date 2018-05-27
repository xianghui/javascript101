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
more values. The syntax for the **rest operator** consists of `...` and an
**variable name**. The arguments are now accessible by the **variable name** as
an array. Another difference between using the **rest operator** as oppose to
`arguments` is that the **rest operator** can match by the position rather than
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

Notice that `items` can be used to group all all the arguments after the second
arguments (probably the reason why it was given the name **rest** - i.e. rest of
the arguments). The function is also more readable. Of course, we could have
just supplied an array of items instead of calling the function with multiple
arguments.

#### The rest operator is used to group up the rest of the arguments

As mention above, one way to look at the **rest operator** is to think of it as
a way to group up the **rest of the arguments** that we have in the function.
What this means is that there should not be any arguments after the rest
operator. JS will complain that there is a syntax error if we do that.

```javascript
//SyntaxError: Rest parameter must be last formal parameter
function foo(a, b, ...c, d){
  //...
}
```

## Spread Operator

There is also a **spread operator** which essentially does the opposite. It is
sometimes used together with the **rest operator** but the **spread operator**
can be used in more scenarios

TODO: different types of scenarios of using spread

##### Expressions

#### Array Literal

#### Object Literal
