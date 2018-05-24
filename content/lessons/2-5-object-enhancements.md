---
title: "2.5 Object Enhancements"
---

##Object Literal Shorthands

ES6 comes with a few shorthands notations for the object literal notation.

#### Object Properties

If the property name and the binding variable is the same name, it is now
possible not to explicitly specify now.

```javascript
//previously
let name = 'John';
let age = 20;
let person = {
  name: name,
  age: age
};

//now
let name = 'John';
let age = 20;
let person = {
  name,
  age
};
```

#### Methods

Similar to how we define methods in the new
[ES6 class syntax](/2-4-es-6-class-system#class-definition-using-code-classlanguage-textclasscode),
we may omit the colon (`:`) and the `function` keywords.

```javascript
//previously
var redCircle = {
  radius: 3,
  color: 'red',
  calculateArea: function() {
    return Math.PI * this.radius * this.radius;
  }
};

//now
var redCircle = {
  radius: 3,
  color: 'red',
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
};
```

##Computed Property Names

There is now support for computed property names. To understand this, let us
consider the following code snippets. Notice that the property names `radius`
and `color` has to be pre-defined in the codes.

```javascript
var redCircle = {
  radius: 3,
  color: 'red',
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
};
```

Sometimes, the property name can only be determine during runtime.

```javascript
let key1 = prompt(`Please enter first property`); //Enter: name
let value1 = prompt(`Please enter value of ${key1}`); //Enter: John

let key2 = prompt(`Please enter first property`); //Enter: age
let value2 = prompt(`Please enter value of ${key2}`); //Enter: 20

const obj = {
  [key1]: value1,
  [key2]: value2
};

console.log(obj); //{name: "John", age: "20"}
```

The property names can also be designed progammatically.

```javascript
var type = 'login';
var user = 'John';

const obj = {
  [type + '_user']: user
};

console.log(obj); //{login_user: "John"}
```

The property can also be used to define methods.

```javascript
function getFieldName() {
  return 'Name';
}

const obj = {
  ['get' + getFieldName()]() {
    return 10;
  }
};

console.log(obj);
console.log(obj.getName()); //10
```

![](images/computed_properties.png 'Computed properties')

<div>
  <div class='text-left'>
    <a href="/2-4-es-6-class-system">Prev: 2.4 ES6 Class System</a>
  </div>

  <div class='text-right'>
    <a href="/2-6-rest-and-spread-operators">Next: 2.6 Rest and Spread Operators</a>
  </div>
</div>
