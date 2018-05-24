---
title: "2.4 ES6 Class System"
---

## Class Definition using `class`

Instead of using
[function constructors](/1-5-objects#object-oriented-programming-oop) and the
[object literal notation](/1-5-objects#object-literal-notation) to define
objects/create objects, ES6 comes with a `class` keyword which we can use to
define a class. The syntax looks a little similar to Java, methods of the class
is defined similar to how we would define a named function without the
`function` keyword.

To define a constructor (optional), we can define a method call `constructor`
with a number of parameters. Note that we can only define at most one
`constructor` in a class. Similarly, for methods, we cannot define multiple
methods with the same name but have different number of parameters. There is
**no concept of method/constructor overloading in JS**.

```javascript
class Point {
  //define constructor
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //method to move the point by x and y units
  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

let p1 = new Point(0, 0);
p1.move(2, 3);
console.log(p1);
//Point {x: 2, y: 3}
```

If we look into the details of `p1` in the developer console, note that
`move(x, y)` is defined in `__proto__`.

![](images/obj5.png 'Point object')

## Inheritance

We no longer have to use
[the `Object.create()` syntax](/1-5-objects#deeper-prototype-chains) to create
subclasses. Instead, ES6 also comes with the `extends` syntax. In addition, we
can also use the `super()` keyword to access the superclass's constructor. If
suppose a subclass defines a constructor, the constructor must call the
`super()` statement it has to be the first statement in the constructor.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Staff extends Person {
  constructor(name, age, staffId) {
    //access superclass's constructor
    //super needs to be called first
    super(name, age);

    this.staffId = staffId;
  }
}

let tom = new Staff(123, 'Tom', 25);
console.log(tom);
//Staff {name: "Tom", age: 25, staffId: 123}

console.log(tom instanceof Staff); //true
console.log(tom instanceof Person); //true
```

Note that constructor definition is again optional.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

//this is fine (no syntax error)
class Staff extends Person {}

//this will call the superclass constructor
//i.e. 25 is not considered in the initialization
let tom = new Staff(123, 'Tom', 25);
console.log(tom);
//Staff {name: "Tom", age: 25}
```

If we want to access a superclass method, it is also possible using the
`super.methodName()` syntax.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  generateProfile() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

class Staff extends Person {
  constructor(name, age, staffId) {
    //access superclass's constructor
    //super needs to be called first
    super(name, age);

    this.staffId = staffId;
  }

  generateProfile() {
    return `StaffId: ${this.staffId}, ${super.generateProfile()}`;
  }
}

let tom = new Staff(123, 'Tom', 25);
console.log(tom.generateProfile());
//StaffId: 25, Name: 123, Age: Tom
```

## Getters and Setters

JS also supports defining of **getters** and **setters** for the object
properties. These properties can then be accessed by accessing the properties as
if the property is defined using `this`. The benefit of such idea (similar to
C#) is that it allows you to inject additional logic when accessing/mutating the
property, or even create **computed fields** that are not defined using `this`.

```javascript
class Circle {
  constructor(radius) {
    //make sure that the property name is not the same as the set/get property
    //if not we will have stack overflow!
    this._radius = radius;
  }

  get radius() {
    console.log('###Accessing radius###');
    return this._radius;
  }

  set radius(r) {
    console.log('###Mutating radius###');
    this._radius = r;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }

  set area(area) {
    const r2 = area / Math.PI;
    this.radius = Math.sqrt(r2);
  }
}

let c1 = new Circle(3);

console.log(c1.area);
//###Accessing radius###
//###Accessing radius###
//28.274...

c1.radius = 4;
//###Mutating radius###

console.log(c1.area);
//###Accessing radius###
//###Accessing radius###
//50.265...

c1.area = 100;
//###Mutating radius###

console.log(c1.radius);
//###Accessing radius###
//5.641...
```

In the above example, we created an accessor (`get radius()`) and a mutator
(`set radius(r)`) for the `_radius` property. Notice that in the constructor, we
**define the property as `this._radius = radius` rather than
`this.radius = radius`**. This is something to be careful about! If we had
defined `radius`, it will result in a stack overflow situation where
`set radius(r) { this.radius = r}` will be triggered infinitely since the body
of the mutator (`this.radius = r`) will trigger the mutator again.

Note it is also possible to create a computed field (`area`) that is not
directly a property but rather a computation of another field.

##Static Methods

There is also support for static methods.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  //static method to generate a random person
  static getRandomPerson() {
    const randomNames = ['John', 'Jane', 'Tom', 'Pete'];

    //generate a random name from the list
    const randName =
      randomNames[Math.floor(Math.random() * randomNames.length)];

    //generate a random age from 10 to 99
    const randAge = Math.floor(Math.random() * 90) + 10;

    return new Person(randName, randAge);
  }
}

let p1 = Person.getRandomPerson();
console.log(p1);
//e.g. Person {name: "Pete", age: 91}
```

#### What is the difference between static methods and prototype methods?

Consider the following code snippet:

```javascript
//...

Person.prototype.method1 = function() {
  console.log('in method1');
};

let p1 = Person.getRandomPerson();
console.log(p1);
//e.g. Person {name: "Pete", age: 91}

p1.getRandomPerson(); //TypeError: p1.getRandomPerson is not a function

p1.method1(); //in method1
Person.method1(); //TypeError: Person.method1 is not a function
```

Static methods should be called on the class instead of an object. They are
really just normal functions rather that associated with an object instance.

Whereas, prototype methods follow the idea of
[prototypal inheritance](/1-5-objects#prototypal-inheritance) where all copies
of this type of object will inherit the method. Unlike static methods, they are
only available in objects (i.e. object instances created with the `new`
keyword).

## Hoisting

We talked about [hoisting previously](/1-3-functions#hoisting) - variable /
function declarations are moved to the top (i.e. they can be accessed even
before they are declared in the codes). Take note however that **class
declarations are not hoisted**

```javascript
let a = new SomeClass(); //ReferenceError: SomeClass is not defined

class SomeClass {}
```

<div>
  <div class='text-left'>
    <a href="/2-3-string-enhancements">Prev: 2.3 String Enhancements</a>
  </div>

  <div class='text-right'>
    <a href="/2-5-object-enhancements">Next: 2.5 Object Enhancements</a>
  </div>
</div>
