---
title: "2.7 Destructuring"
---

Together with the rest and spread operators, ES6 also comes with a
**destructuring assignment** capability. It allows easy matching of arrays or
properties from objects and assigning them to variables.

## Array Matching

It is possible to match and unpack variables from an array into variables. For
example, the following code snippet shows how we can assign the first value of
an array into a variable `first` and assign the second value of the array into a
variable `second`.

```javascript
var array = [1, 2, 3, 4, 5];

var [first, second] = array;

console.log(first); //1
console.log(second); //2
```

It is possible to skip one or more variables in the array.

```javascript
var array = [1, 2, 3, 4, 5];

var [first, , third, , fifth] = array;

console.log(first); //1
console.log(third); //3
console.log(fifth); //5
```

It is also possible to use destructuring together with the rest operator.

```javascript
var array = [1, 2, 3, 4, 5];

var [, , ...rest] = array;

console.log(rest); //[3, 4, 5]
```

Destructuring also provides an easy way to swap values of 2 variables.

```javascript
//traditionally, we will define a temporary value for doing swapping
var num1 = 10;
var num2 = 20;
var temp;

//swapping
temp = num1;
num1 = num2;
num2 = temp;

console.log(num1); //20
console.log(num2); //10

var num1 = 10;
var num2 = 20;

//now with destructuring - just 1 statement!
var [num1, num2] = [num2, num1];

console.log(num1); //20
console.log(num2); //10
```

## Object Matching

It is also possible to destructuring object properties.

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

//assume we want the firstName the person object,
//typically this is what we will do:
var firstName = person.firstName;

//with destructuring:
var { firstName } = person;

//this is equivalent to:
//var firstName = person.firstName;

console.log(firstName); //John
```

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

//possible to destructure multiple properties
var { firstName, lastName } = person;

console.log(firstName); //John
console.log(lastName); //Doe
```

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

//if some properties should be const, should split
//the variable declarations
const { firstName, lastName } = person;
let { age } = person;

console.log(firstName); //John
console.log(lastName); //Doe
console.log(age); //20
```

```javascript
//possible to separate variable declaration from the assignment
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

//possible to destructure multiple properties
var firstName, lastName;

//must enclose with ( )
({ firstName, lastName } = person);

console.log(firstName); //John
console.log(lastName); //Doe
```

Notice that the destructured variables are taking the same name as the property
of the object. It is also possible to declare and assign it to another variable
name (i.e. "rename" the variable).

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

var { firstName: fname, lastName: lname } = person;

console.log(fname); //John
console.log(lname); //Doe

console.log(firstName); //Error: firstName is not undefined
```

It also works with property names with spaces.

```javascript
var person = { 'first name': 'John', 'last name': 'Doe', age: 20 };

var { 'first name': fname, 'last name': lname } = person;

console.log(fname); //John
console.log(lname); //Doe
```

While not common, it is possible to use the above "renaming" idea together with
computed property names.

```javascript
var key = 'firstName';
var { [key]: fname } = person;

console.log(fname); //John

//note that without computed property syntax we won't be able to do it
//since the property will be wrongly treated as the property name:
var { key: fname } = person;

//this will be same as:
var fname = person.key;
```

Possible to use the **rest operator** with destructuring similar to array.

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

var { age, ...rest } = person;

console.log(rest); //{firstName: "John", lastName: "Doe"}
```

## Nested Array/Object Matching

Destructuring works with nested array/object.

```javascript
var person = {
  name: {
    firstName: 'John',
    lastName: 'Doe'
  },
  addresses: [{ address: '123 Mars Street' }, { address: '456 Rainbow Town' }]
};

var {
  name: { firstName, lastName },
  addresses: [firstAddress]
} = person;

console.log(firstName); //John
console.log(lastName); //Doe
console.log(firstAddress); //{address: "123 Mars Street"}
```

The above ideas (renaming, rest, etc) works together with this.

```javascript
var person = {
  name: {
    firstName: 'John',
    lastName: 'Doe'
  },
  addresses: [{ address: '123 Mars Street' }, { address: '456 Rainbow Town' }]
};

var {
  name: { firstName: fname }
} = person;

console.log(fname); //John
```

## Default values

Similar to
[default values for functions](/1-3-functions#default-parameter-values), it is
possible to define default values when doing destructuring.

```javascript
//assume the person is retrieved from an AJAX request
//where some of the properties might be not defined
var person = { firstName: 'John', age: 20 };

var { firstName, lastName } = person;

console.log(firstName + ' ' + lastName); //John undefined

//could define default values for the variables
var { firstName = '', lastName = '' } = person;

console.log(firstName + ' ' + lastName); //John
```

The default value can be objects.

```javascript
var person = {
  name: {
    firstName: 'John',
    lastName: 'Doe'
  },
  addresses: [{ address: '123 Mars Street' }]
};

var {
  name: { firstName: fname },
  addresses: [, secondAddress = { address: 'no second address' }]
} = person;

console.log(secondAddress); //{address: "no second address"}
```

## Function Parameter Matching

Destructuring can be used in function parameters. This allows more concise
codes.

```javascript
var person = { firstName: 'John', lastName: 'Doe', age: 20 };

function printName({ firstName = '', lastName = '' }) {
  console.log(firstName + ' ' + lastName);
}

printName(person); //John Doe

//previously without destructuring we would have to do this:
function printName1(firstName = '', lastName = '') {
  console.log(firstName + ' ' + lastName);
}

printName1(person.firstName, person.lastName); //John Doe
//but this approach becomes more cumbersome with more properties
```

Whatever that is discussed applies could be used together with destructuring for
function parameters (e.g. what we see above - default values).

```javascript
//array destructuring
var array = [1, 2, 3, 4, 5, 6];

function foo([first, second, ...rest]) {
  console.log('sum of first 2 values:', first + second);

  function sumReducer(accumulator, currentValue) {
    return accumulator + currentValue;
  }

  console.log('sum of the rest of the values:', rest.reduce(sumReducer, 0));
}

foo(array);
//sum of first 2 values: 3
//sum of the rest of the values: 18
```

<div>
  <div class='text-left'>
    <a href="/2-6-rest-and-spread-operators">Prev: 2.6 Rest and Spread Operators</a>
  </div>

  <div class='text-right'>
    <a href="/2-8-promises">Next: 2.8 Promises</a>
  </div>
</div>
