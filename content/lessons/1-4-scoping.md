---
title: "1.4 Scoping"
---

## Scoping

Unlike most programming languages (such as C/Java) which is using **Block
Scoping**, Javascript consists of both **Function Scoping** and **Block
Scoping**. Scoping is relevant when dealing about variable (or function)
declaration.

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

In JS, we have something called **function scoping** (i.e. a new scope is
created inside a function).

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

As seen in previous examples, variables are defined using the `var` keyword.
`let` and `const` were introduced later on in ES6 (ECMAScript 6), which allows
us to define variables with block scoping (to be elaborated later).

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

We have seen in [1.2 Functions](/1-3-functions#nested-functions) that functions
can be defined within functions.

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
    console.log(parent + ' --- ' + child);
  }

  bar();
}

foo(); //parent --- child
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
parent(); //1
```

In the above example, note that at the global scope, we have the `window`
object.

```javascript
//Another example
var somevar = 'abc';
console.log(somevar); //abc
console.log(window.somevar); //abc
```

One thing to be careful is that when declaring variables in functions, if you do
not use the `var`, `const`, or `let` keyword, the variable will be declared a
global scope instead.

```javascript
function foo() {
  //using var keyword
  var x = 'def';
  console.log(x);
}

foo(); //def
console.log(x); //x is not defined
```

```javascript
function foo() {
  //not using var keyword
  x = 'def';
  console.log(x);
}

foo(); //def
console.log(x); //def
```

### Classic loop pitfall

One of the classic pitfall/gotcha regarding **function scoping** is that it
might behave differently from what we think it should (especially if you have
prior programming language in other languages that are using block scoping).
Consider the following example html code example with 5 buttons. In each HTML
button, we can assign an `onclick` handler, which we hope to show the button
index. It turns on that when you click on any of the button, it always show 5
(instead of the respective index) :angry:.

```html
<button>Button 0</button>
<button>Button 1</button>
<button>Button 2</button>
<button>Button 3</button>
<button>Button 4</button>
```

<iframe height='280' scrolling='no' title='Loop Pitfall' src='//codepen.io/hsianghui/embed/YLExbK/?height=280&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/hsianghui/pen/YLExbK/'>Loop Pitfall</a> by HsiangHui Lek (<a href='https://codepen.io/hsianghui'>@hsianghui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### Why does this happen?

Recall the concept of **function scoping**. A closure is created when a function
is declared. On the global scope, the variables are defined in the web browser's
window object. When we declare the variable `i` (`var i`), `i` is declared and
assigned the value of 0 (`var i = 0`) at the start. For each iteration, we
declare a new function and assign to the `onclick` handler of each button. When
we click on the button, the respective `onclick` handler will be triggered. In
which case, it will try to evaluate the value of `i`. Since `i` **is not defined
in this function**, it will look up the value of `i` in the parent's
environment.

```javascript
//global scope
var buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
  //global scope
  buttons[i].onclick = function(e) {
    //local scope
    alert(i);
  };
}
```

The reason why the value 5 is shown for all the button is because during
runtime, the final value of `i` will be 5 (in which case it will break out of
the for loop).

| Iteration | window's environment | description                                                                                   |
| --------- | -------------------- | --------------------------------------------------------------------------------------------- |
| 0         | [...., `i`: 0]       | `i` is declared and assigned the value of 0                                                   |
| 1 ... 4   | [...., `i`: 1]       | value of `i` in the window's environment changes from 0 to 4                                  |
| 5         | [...., `i`: 5]       | value of `i` changes to 5 and `i < buttons.length` evaluates to `false` and break out of loop |

#### How can we resolve this?

One way to resolve this is to create the variable `i` in the closure for each of
the `onclick` handler. Unlike the previous example where `i` is not defined in
the function (and not defined as a function parameter), we now define it as a
function parameter so that `i` will be a variable in the local environment. `i`
in this local environment is mapped to the value of the first function parameter
(**pass by value**). This is to ensure that when we are assigning a function to
each of the button onclick handler during runtime, there will be a different
copy of `i` created for each iteration - that is the purpose of `function(i){
... }(i);`.

Since each button onclick handler requires a function declaration, we then need
to return a `function(e){ ... }` like before

<iframe height='350' scrolling='no' title='Looping closure' src='//codepen.io/hsianghui/embed/deZZEe/?height=350&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/hsianghui/pen/deZZEe/'>Looping closure</a> by HsiangHui Lek (<a href='https://codepen.io/hsianghui'>@hsianghui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you find the above codes confusing, try renaming `i` to `i2`.

```javascript
var buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
  //define a function that takes in a parameter
  buttons[i].onclick = (function(i2) {
    //we name this parameter as i2
    //we could just name the parameter as i like the example above
    //if we name it as i, it will overshadow the i variable in the for loop

    //there is a mapping of i2 to a value in this local scope
    return function(e) {
      alert(i2);
    };
  })(i);
  //keypoint is that we need to supply current value of i in tho this function
}
```

After executing the codes:

| Button Index | window's environment | Button environment |
| ------------ | -------------------- | ------------------ |
| 0            | [...., `i`: 5]       | [`i2`: 0]          |
| 1            | [...., `i`: 5]       | [`i2`: 1]          |
| 2..3         | [...., `i`: 5]       | ...                |
| 4            | [...., `i`: 5]       | [`i2`: 4]          |

### `let`/`const` keyword
