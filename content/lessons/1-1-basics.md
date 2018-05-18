---
title: "1.1 Basics"
---

## Developer console

To get started with learning Javascript (JS), probably the easiest way is to use
the developer console in your web browser. You can access the developer console by
pressing F12 (windows/chrome, firefox) or Cmd+Opt+J (mac/chrome).

One of the most common commands that you will use to debug your program is
`console.log`. It is equivalent to the `System.out.println()` in Java. It will
print out the results in the developer console.

![](images/consolelog.png 'console.log')

Alternatively, you can also use the `alert()` command which will pop up an alert
box but it can get quite irritating as you end up having to press OK to
continue.

```javascript
alert('hello world');
```

![](images/alert.png 'alert')

## Semicolons?

Unlike Java/C where we need to terminate each lines with semicolons, in
Javascript, semicolons are optional for terminating statements. I have come
across a number of developers who prefer not to use semicolons and just use line
breaks for termination of line.

```javascript
var a = 10;

//this is fine too!
var a = 10;
```

Personally, coming from a Java background, I still prefer terminating my lines
with semicolons. You should note that semicolons are however required for some
situations:

* writing codes in a single line (e.g. `var a = 10; var b = 20;`)
* return statement from a function. You can enclose your return value in `( )`.
  This is quite common when coding with <a href="https://reactjs.org/" target="_blank">ReactJS</a>

```javascript
function foo() {
  return
  5;
}
console.log(foo()); //undefined (not 5!)

// the above example would be effectively:
function foo() {
  return;
  5;
}

// alternatively, you could use ( )
// prettier-ignore
function foo1() {
  return (
    5
  )
}

console.log(foo1()); //5
```

<div class='text-right'>
  <a href="/1-2-variables">Next: 1.2 Variables</a>
</div>
