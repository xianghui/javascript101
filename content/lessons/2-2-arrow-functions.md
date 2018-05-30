---
title: "2.2 Arrow Functions"
---

## Another Function Declaration Syntax

In ES6, we have another function declaration syntax which is much shorter known
as the **arrow function**. The syntax is a little similar to lambda
expressions/functions present in other languages such as C# and Python. If there
is only an expression, the expression will be assumed to be the return value so
the `return` keyword is optional. You will have to use the `return` keyword if
there are multiple statements.

```javascript
const add = function(n1, n2) {
  return n1 + n2;
};

//arrow function (equivalent)
//return is optional (assumed)
const add = (n1, n2) => n1 + n2;
```

Arrow function can also be used to do side effect instead of returning values.
Similar to the `function` syntax, we use `{ }` to enclose the statements. They
are often used for callback functions.

```javascript
var array = [1, 2, 3, 4, 5];

array.forEach(function(i) {
  console.log(i);
});

//equivalent:
//arrow function does not have to return something
//if there is only 1 parameter, ( ) is optional
array.forEach(i => {
  console.log(i);
});
```

If there is only 1 parameter, the enclosing `( )` for the parameter is optional.
However, if there is no parameter, we have to put `( )` so that there is no
syntax error.

```javascript
const printMessage = msg => {
  console.log(msg);
};

printMessage('blar'); //blar

//if no parameters, have to put ()
const sayHello = () => {
  console.log('hello');
};

sayHello(); //hello
```

Note that when there is only a single statement and we are not using the return
statement (like the above `add` example), we must explicitly enclose with `( )`
so that the JS engine will not interpret it as normal statements within the
`{ }` block.

```javascript
//invalid
const person = () => {name: 'John', age: 20};

//have to enclose with ()
const person = () => ({name: 'John', age: 20});

console.log(person());
//{name: "John", age: 20}
```

It might seem that arrow function is a perfect replacement for the `function`
syntax, and is preferred since it is much shorter. However, there is a
fundamental difference between the 2 constructs when dealing with objects and
the `this` keyword.

## Calling Context and Lexical Context

Before we discussed the key difference between arrow functions and `functions`
syntax, let us explore the notion of `this` and **context** by which a function
is called.

```javascript
function Circle(radius) {
  this.radius = radius;

  this.getArea = function() {
    return Math.PI * this.radius * this.radius;
  };
}

let c1 = new Circle(3);
console.log(c1.getArea()); // PI * 3 * 3 = 28.274...
```

Suppose now we change the above example slightly, instead of calling `getArea()`
directly, we get the `getArea()` function reference from the `c1` object and
after some time, we call the function.

```javascript
function Circle(radius) {
  this.radius = radius;

  this.getArea = function() {
    return Math.PI * this.radius * this.radius;
  };
}

let c1 = new Circle(3);

//get the function of the area function in the c1 object
const areaFunction = c1.getArea;

//call it
console.log(areaFunction()); //NaN
```

We will realize that the results from the `getArea()` function invocation now
returns a `NaN` instead of the usual 28.274. Why is the result `NaN`? Is the
function even executed?

Let us add a `console.log(this);` line in `getArea()` to print out the `this`
reference. It turns out that the **context** by which `getArea()` is called is
different compared to the previous case. Thus, the `this` reference in
`getArea()` in this case is not referring to the `c1` object. Instead, it is
referring to the `window` object.

```javascript
function Circle(radius) {
  this.radius = radius;

  this.getArea = function() {
    //print out the "this" reference
    console.log(this);
    return Math.PI * this.radius * this.radius;
  };
}

let c1 = new Circle(3);

//get the function of the area function in the c1 object
const areaFunction = c1.getArea;

//call it
console.log(areaFunction());
//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//NaN
```

#### Another Example - Clock

Consider the following example which defines a Clock object that will increment
the time value every second (using `setInterval()`). We would expect it to print
`5` after 5 secs.

```javascript
function Clock() {
  this.time = 0;

  //setInterval will execute the callback function every 1000ms (1s)
  setInterval(function() {
    this.time++;
  }, 1000);
}

var clock1 = new Clock();
//wait 5 secs
console.log(clock1.time);
```

If we execute the above codes, we will realize the value of `clock1.time` is
always 0. To see why is this happening, let us print out the `this` reference
each time the callback function in `setInterval()` is invoked.

```javascript
function Clock1() {
  this.time = 0;

  //setInterval will execute the callback function every 1000ms (1s)
  setInterval(function() {
    console.log(this);
  }, 1000);
}

var clock1 = new Clock1();
//a series of Window object is printed every sec
//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
```

Again, we see that the context that the callback function for `setInterval()` is
getting is the `window` object. This example demonstrates that functions in
objects might not work the way how we might expect, and sometimes
counter-intuitive to the programming logic.

#### Solution1: Define a variable pointing to `this` and use it inside the function instead of using `this` directly

To fix this, we often define a separate variable capturing the `this` reference.

```javascript
function Clock() {
  this.time = 0;

  //define a variable that is capturing the "this" reference
  let self = this;

  //setInterval will execute the callback function every 1000ms (1s)
  setInterval(function() {
    self.time++;
  }, 1000);
}

var clock1 = new Clock();
//wait 5 secs
console.log(clock1.time);
```

#### Solution2: Use the bind() method

Each `function` comes with a `bind()` prototype method that allows us to bind
the `this` context received by the function.

```javascript
function Circle(radius) {
  this.radius = radius;

  this.getArea = function() {
    //print out the "this" reference
    console.log(this);
    return Math.PI * this.radius * this.radius;
  };
}

let c1 = new Circle(3);

//get the function of the area function in the c1 object
const areaFunction = c1.getArea.bind(c1);

//call it
console.log(areaFunction());
//Circle {radius: 3, getArea: ƒ}
//28.274...
```

```javascript
function Clock() {
  this.time = 0;

  //define the callback function and bind its "this" variable
  const cb = function() {
    this.time++;
  }.bind(this);

  //setInterval will execute the callback function every 1000ms (1s)
  setInterval(cb, 1000);
}

var clock1 = new Clock();
//wait 5 secs
console.log(clock1.time);
```

#### `this` in `function` is derived from the calling context

Without using `bind()` to explicitly bind the context, the `this` reference in
`function` is derived from the **context by which the function is called**
rather than where they were defined.

The same problem happens when we are trying to do a **Asynchronous Javascript
and XML (AJAX)** call in an object, and then updating the fields of the object
based on the results of the AJAX call - `this` will not be referring to the
current object! We have to use the same trick as before. This is quite a common
use case and developers have been using this approach to make the program work
as expected. The [Fetch API](/3-1-ajax) (`fetch()` and [Promises](/2-8-promises)
(`.then()` keyword) will be discussed in later sections.

```javascript
function Person() {
  this.name = null;
  this.phone = null;

  let self = this;

  //call an API using the Fetch API
  //and update the name and gender field in this object
  this.getRandomPerson = function() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(function(response) {
        return response.json();
      })
      .then(function(person) {
        self.name = person.name;
        self.phone = person.phone;
      });
  };
}

var person1 = new Person();
person1.getRandomPerson();

//wait a while until the data has been fetched
console.log(person1);
```

#### Lexical Context

It turns out that the more elegant approach is to use **arrow functions**. So
the above program would look like this (just like how we would hope it to work):

```javascript
function Person() {
  this.name = null;
  this.phone = null;

  //call an API and update the name and gender field in this object
  this.getRandomPerson = function() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(person => {
        this.name = person.name;
        this.phone = person.phone;
      });
  };
}

var person1 = new Person();
person1.getRandomPerson();

//wait a while until the data has been fetched
console.log(person1);
```

Basically, arrow functions **do not have its own `this`**, instead the `this`
reference in an arrow function is bound to its enclosing environment (i.e.
**lexical context**). This means that the reference to `this` is based on how it
is defined in the code rather than based on how it is called during runtime.

<div>
  <div class='text-left'>
    <a href="/2-1-es-6-enhancements">Prev: 2.1 ES6 Enhancements</a>
  </div>

  <div class='text-right'>
    <a href="/2-3-string-enhancements">Next: 2.3 String Enhancements</a>
  </div>
</div>
