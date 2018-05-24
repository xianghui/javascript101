---
title: "1.3 Functions"
---

## Function Declaration

Functions are defined using the `function` keyword. Some functions can return a
value while others do actions without returning a value.

```javascript
function sum(num1, num2) {
  return num1 + num2;
}

//another way to define functions
var sum = function(num1, num2) {
  return num1 + num2;
};

var n1 = 1,
  n2 = 2;
var result = sum(1, 2); //3
```

Unlike strongly typed languages like Java, we do not need to specify any type
for the function parameters (or `var`). Function parameters can be thought as
declared with `var PARAMETER_NAME`. When we invoke a function, we are allowed to
omit the values for the function parameters, but note that the function
parameters will match by position from left to right. So, if you want a variable
to be optional, you probably want to put it on the right side. If not, you could
also use `undefined` as the parameter value, but your codes might look a bit
awkward.

```javascript
function foo(x) {
  //console.log can take in multiple parameters
  //this has the effect of console.log('x is ' + x);
  console.log('x is', x);
}

foo(1); //x is 1
foo(); //x is undefined

function foo1(x, y, z) {
  console.log('x is', x);
  console.log('y is', y);
  console.log('z is', z);
}

foo1(1, 2);
//x is 1
//y is 2
//z is undefined

foo1(undefined, 4, 5);
//x is undefined
//y is 4
//z is 5

foo1(7, undefined, 8);
//x is 7
//y is undefined
//z is 8
```

[Recall that there is a difference between `undefined` and `not defined`](/1-2-variables#undefined-vs-not-defined).
`undefined` is used to denote cases where a variable is declared but not
assigned a value, whereas `not defined` is an error that is thrown when that
variable is declared. When you try to access a variable that is not declared (as
the function parameters or inside the function or in its parent's scope), we get
a `not defined` error.

```javascript
function bar(x) {
  console.log('bar(): ' + x);
  console.log('bar(): ' + y);
}

bar();
//bar(): undefined
//Error: y is not defined
```

## Hoisting

Javascript has a special behavior called **hoisting** which moves (variable or
function) declarations to the top (_theoretically speaking, it does not really
move the declarations to the top but this is an easy way to understand this
concept_).

If we were to change the above example to the following, you will realize that
the browser no longer shows the `not defined` error. Instead, `y` is now
undefined. It might look strange especially for those who are familiar with
strongly typed languages like Java. The reason this is happening is because JS
will move the variable declaration (`var y`) to the top of the function.

```javascript
function bar1(x) {
  console.log('bar1(x): ' + x);
  console.log('bar1(y): ' + y);

  var y;
}

bar1();
//bar1(x): undefined
//bar1(y): undefined
```

Note that only the declaration is hoisted rather than the initialization. You
should be careful not to think of this as copying and pasting the line to the
top of the function.

```javascript
function bar2(x) {
  console.log('bar2(x): ' + x);
  console.log('bar2(y): ' + y);

  var y = 10;
}

bar2();
//bar2(x): undefined
//bar2(y): undefined
//  -notice that "bar2(y): 10" is not printed
//  this is because only "var y" is hoisted to the top of the function
//  y = 10 (the initialization is not hoisted)
```

In some languages, you get an error when you redeclare a variable. However, in
JS, you can redeclare a variable (you should not be doing it but JS does not
stop you from doing it). Furthermore, it does not reset the value of the
variable to undefined when you declare the same variable. Again, this is due to
hoisting, which will move the declaration to the top (before the
initialization).

```javascript
function bar3() {
  var y = 10;
  var y;
  console.log('bar3(y): ' + y);

  //this will be more like:
  //var y;
  //y = 10;
}

bar3(); //bar3(y): 10
```

Function declaration works similar to variable declarations. It is hoisted to
the top of the "global" context so you can call the function even though the
function is declared is below the function invocation.

```javascript
f1();
function f1() {
  console.log('f1');
}
```

However, if you were to assign a function to a variable, note that the usual
rules for variable hoisting applies - **only the variable declaration is
hoisted, not the initialization (the function definition)**.

```javascript
f2(); //Error: f2 is not a function
var f2 = function() {
  console.log('f2');
};
```

## Default Parameter Values

It is possible to check whether the function parameters are assigned to a value.
If a parameter is undefined, we might want to assign a default value to it.

```javascript
function test(x) {
  // === is used to compare that the 2 expressions have the same type and same value
  // == will attempt to do type conversion
  // for e.g. 1 == "1" is true
  if (x === undefined) {
    x = 'DEFAULT';
  }

  console.log('test(): ' + x);
}

test(); // test(): DEFAULT
test('hello'); // test(): hello
test(''); // test():
test(0); // test(): 0
test(1); // test(): 1
test(-1); // test(): -1
test(false); // test(): false
```

Alternatively, there is a shorter syntax but works slightly differently for
boundary cases. Similar to Java, `||` is a **short-circuit evaluation operator**
which will stop evaluation once we are able to determine a value (i.e. if the
left-hand side value is true, it will stop evaluation).

```javascript
function test1(x) {
  x = x || 'DEFAULT';

  console.log('test1(): ' + x);
}

test1(); // test1(): DEFAULT
test1('hello'); // test1(): hello

//empty string evaluates to false
test1(''); // test1(): DEFAULT

//0 evaluates to false
test1(0); // test1(): DEFAULT

test1(1); // test1(): 1
test1(-1); // test1(): -1

//false evalutes to false
test1(false); // test1(): DEFAULT
```

The above approaches become cumbersome when we have many function parameters.
They also seem to be "hackish" solutions to the problem. In ES6 (ECMAScript 6),
there is a proper syntax which specifically handles this. The notation is
similar to PHP and Python.

```javascript
function test2(x = 'DEFAULT') {
  console.log('test2(): ' + x);
}

test2(); // test2(): DEFAULT
test2('hello'); // test2(): hello
test2(''); // test2():
test2(0); // test2(): 0
test2(1); // test2(): 1
test2(-1); // test2(): -1
test2(false); // test2(): false
```

## Pass by Value

Similar to Java, JS is **pass by value**. We cannot change the value of the
primitive type in a function. The function **gets the value** of the original
variable **instead of the reference of the variable**. So when we modify the
function variable, it does not modify the original variable.

```javascript
var globalVal = 10;
function modifyVal(value) {
  value = 11;
}
modifyVal(globalVal);
console.log(globalVal); //10
```

Note that, if we were to pass in an object, it is possible to change the
contents of the object (e.g. a property of the object). However, again the
function does not have the reference to the original variable so it cannot
initialize the variable to point to another object (or another value). This is
similar to the case for Java. For example, if you invoke a method and supply an
ArrayList, you can change the contents of the ArrayList, but you cannot assign
it to another value.

```javascript
var globalObj = { var1: 'OLD_VALUE' };
console.log(globalObj);

function modifyObject(obj) {
  obj.var1 = 'NEW_VALUE';
}

modifyObject(globalObj);
console.log(globalObj);
```

```java
//Java example
public static void addItem(ArrayList<String> array){
  array.add("new item");
}

ArrayList<String> arr = new ArrayList<String>();
System.out.println(arr.size()); //0
addItem(arr);
System.out.println(arr.size()); //1

public static void changeItem(ArrayList<String> array){
  //once we do this, we lose access to the original object
  array = new ArrayList<String>();
  array.add("new item");
}

ArrayList<String> arr = new ArrayList<String>();
System.out.println(arr.size()); //0
changeItem(arr);
System.out.println(arr.size()); //0
```

## Nested Functions

It is possible to define functions inside a function and use them inside
functions.

```javascript
function areaCircle(radius) {
  var square = function(n) {
    return n * n;
  };

  return Math.PI * square(radius);
}

console.log(areaCircle(3)); //PI * 3 * 3

//similar example:
function areaCircle1(radius) {
  function square(n) {
    return n * n;
  }

  return Math.PI * square(radius);
}

console.log(areaCircle1(3)); //PI * 3 * 3
```

### Higher Order Functions

It is also possible for a function to return another function as the return
result.

```javascript
var powerOf = function(base) {
  return function(exponent) {
    var result = 1;
    for (var i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  };
};

var powerOf2 = powerOf(2);
var powerOf3 = powerOf(3);
var square_2 = powerOf2(2); //4
var cube_3 = powerOf3(3); //27
```

## First Class Citizens

We have seen that it is possible to assign a function to a variable.

```javascript
var func = function() { ... };
```

Function values work like a variable which can be passed into another function.

```javascript
var success = function() {
  console.log('success!');
};

var failure = function() {
  console.log('failure!');
};

function checkPassword(pwd, successCallback, failureCallback) {
  if (pwd === 'SECRET') {
    successCallback();
  } else {
    failureCallback();
  }
}

checkPassword('SECRET', success, failure); //success!
checkPassword('WRONG', success, failure); //failure!
```

Functions are **First Class Citizens** in Javascript.

> _In programming language design, a first-class citizen (also type, object,
> entity, or value) in a given programming language is an entity which supports
> all the operations generally available to other entities. **These operations
> typically include being passed as an argument, returned from a function,
> modified, and assigned to a variable**._
>
> Source:
> <a href="https://en.wikipedia.org/wiki/First-class_citizen" target="_blank">Wikipedia</a>

Specifically:

* function can be passed as argument (function values)
* function can be returned from a function (higher-order function)
* function can be assigned to a variable

<div>
  <div class='text-left'>
    <a href="/1-2-variables">Prev: 1.2 Variables</a>
  </div>

  <div class='text-right'>
    <a href="/1-4-scoping">Next: 1.4 Scoping</a>
  </div>
</div>
