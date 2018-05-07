---
title: "1.1 Scoping and Variables"
---

## Scoping

Unlike most programming languages such as C/Java which is using **Block
Scoping**, Javascript (JS) consists of **Function Scoping** and **Block
Scoping**. Scoping is relevant when dealing about variable (or
function -_functions are first class in JS_) declaration.

## Block scoping

Depending on the language, blocks are defined using different syntax. For
example, in Java/C/Javascript, a block is created using { curly brackets }.
Python uses whitespaces for defining blocks.

```java
//Java Example
{
  int x = 10;
  System.out.println(x); //10
}

System.out.println(x); //x is not defined
```

## Function scoping

In JS, we have something called function scoping (i.e. a new scope is created
inside a function).

```javascript
//Javascript Example
function foo() {
  var x = 10;
  {
    var y = 20; //does not make a difference if we were to enclose with { }
  }
  console.log(x); //10
  console.log(y); //20
}
```

### `var` keyword

As seen in previous example, variables are defined using the `var` keyword.
`let` and `const` were introduced later on in ES6 (ECMAScript 6), which allows
us to define variables with block scoping.

```javascript
//Javascript Example
var x = 10;
{
  let y = 20; //does not make a difference if we were to enclose with { }
}
console.log(x); //10
console.log(y); //y is not defined
```

## Closure

Note that we can define functions within functions.

```javascript
function foo() {
  function bar() {
    console.log('bar');
  }
  console.log('foo');
  bar();
}

foo();
//foo
//bar
```

Nested functions "inherit" variables/functions from its parent's scope. This is
achieved through **Closure**. Closure is combination of a function and its
lexical (_allows us to map identifiers to variables_) environment. Some
variables are created in the local environment, some are referencing the parent
environment.

```javascript
function foo() {
  var parent = 'parent';
  function bar() {
    var child = 'child';
    console.log(parent + ' --- ' + child); //parent --- child
  }

  bar();
}

foo();
```

```javascript
//Another example
var a = 1; //env1 = [a:1,...] (window object)
function parent() {
  var b = 2; //env2 = [b:2], env1
  function child() {
    //env3 = [c: 3], env2
    var c = 3;
    //can't find in local env3 => lookup(env2, "a")
    //can't find in env2 => lookup(env1, "a")
    console.log(a); //1
  }
  child();
}
parent();
```

In the above example, we see that at the global scope, we have the window
object.

```javascript
//Another example
var somevar = 'abc';
console.log(somevar); //abc
console.log(window.somevar); //abc
```

One thing to be careful is that when declaring variables in functions, if you do
not use the <code>var</code>, <code>const</code>, or <code>let</code> keyword,
the variable will be declared a global scope instead.

```javascript
function foo() {
  var x = 'def';
  console.log(x);
}

foo(); //def
console.log(x); //x is not defined
```

```javascript
function foo() {
  x = 'def';
  console.log(x);
}

foo(); //def
console.log(x); //def
```

### Class loop pitfall

```html
<button>Button 0</button>
<button>Button 1</button>
<button>Button 2</button>
<button>Button 3</button>
<button>Button 4</button>
```

<iframe height='191' scrolling='no' title='Loop Pitfall' src='//codepen.io/hsianghui/embed/YLExbK/?height=191&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/hsianghui/pen/YLExbK/'>Loop Pitfall</a> by HsiangHui Lek (<a href='https://codepen.io/hsianghui'>@hsianghui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### `let`/`const` keyword

### Hoisting
