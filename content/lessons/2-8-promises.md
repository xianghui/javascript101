---
title: "2.8 Promises"
---

## Callback functions

Before discussing what **Promises** are, it is important to first understand
what **callback functions** are. **Callback functions** are functions supplied
which will be called later (e.g. for `setTimeout()`, we supply a callback
function and a timeout period by which the callback function will be called).

```javascript
//callback function example
var cb = function() {
  console.log('cb is called');
};

setTimeout(cb, 3000);
//"cb is called" is printed after 3000ms

//another way to write using anonymous functions:
setTimeout(function() {
  console.log('cb is called');
}, 3000);
```

## Callback hell

When there are multiple callback functions, this can get very confusing. Thus,
sometimes this is often referred to as **callback hell**.

```javascript
setTimeout(function() {
  if (some_condition) {
    setTimeout(function() {
      setTimeout(function() {
        //do something
      });
    }, 2000);
  } else {
    setTimeout(function() {
      //do something
    }, 3000);
  }
}, 3000);
```

## Promises

`Promise` is a type of object that provides a cleaner way to handle asynchronous
programming in Javascript. The `Promise` object takes in a function with 2
callback functions: `(resolve, reject)`. This function should be implemented
such that the `resolve` function is called when the task is resolved to be
successful, while the `reject` callback is called when the task is resolved to
be not successful.

```javascript
var promise = new Promise(function(resolve, reject) {
  //do a task
  //...

  if (TASK_SUCCESSFUL) {
    resolve(some_data);
  } else {
    reject(some_error);
  }

  //or

  try {
    //...
    //managed to finish all the tasks
    resolve(); //can omit some_data if not going to be used
  } catch (e) {
    reject(e);
  }
});
```

Note that by just defined a promise (using `new Promise()`), does not resolve
the promise. We need to call the `then()` method of this promise object. So, the
idea of using Promise works this way:

* Define a promise and supply a function with the `(resolve, reject)` callback
  functions (i.e. `Promise((resolve, reject) => {...})`). When the task is
  completed, the body of the function should call either the `resolve` or
  `reject` callback function.
* Start resolving the promise by assigning a handler function using `.then()`.

```javascript
//define the promise object
var p = new Promise((resolve, reject) => {
  //do a task
  //...
  //once task is done call either:
  //  resolve(some_data);
  //or:
  //  reject(some_error);
});

//resolve the promise
p.then(
  result => {
    //success case:
    //result will be the "some_data" from above:
    //resolve(some_data)
  },
  error => {
    //failure case:
    //error will be the "some_error" from above:
    //reject(some_error);
  }
);
```

The following is an example illustrating how promises are used.

<iframe height='680' scrolling='no' title='Promise Example 1' src='//codepen.io/hsianghui/embed/XYWmBp/?height=680&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/hsianghui/pen/XYWmBp/'>Promise Example</a> by HsiangHui Lek (<a href='https://codepen.io/hsianghui'>@hsianghui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### So how does this tackle callback hell?

To answer why promises tackle [callback hell](/2-8-promises#callback-hell), note
that `then()` always return a promise.

```javascript
function sleep(timeout) {
  return new Promise(resolve => {
    //this will always be resolved as successful
    //so no need for reject
    setTimeout(resolve, timeout);
  });
}

var result = sleep(2000).then(() => {
  console.log('called after 2secs');
  return 'some data';
});

//after 2 seconds
//"called after 2 secs" is printed

//if we call this, the next resolved data is also captured
//in returned Promise
console.log(result);
//Promise {<resolved>: "some data"}
```

It is also possible to explicitly return another `Promise` object.

```javascript
function sleep(timeout) {
  return new Promise(resolve => {
    //this will always be resolved as successful
    //so no need for reject
    setTimeout(resolve, timeout);
  });
}

sleep(2000)
  .then(() => {
    console.log('called after 2secs');
    return sleep(1000);
  })
  .then(() => {
    console.log('called after 1 sec');
  });

//after 2 seconds
//"called after 2secs" is printed
//after another 1 second
//"called after 2sec" is printed
```

The implication of this is that if we need to call another async function as a
result of an async function, it is possible to chain it with `then()` as if it
is executed in a synchronous manner. For example, consider the typical situation
where a web app will do an AJAX request, and based on the results on the AJAX
request, proceed to do another AJAX request.

```javascript
function sleep(timeout) {
  return new Promise(resolve => {
    //this will always be resolved as successful
    //so no need for reject
    setTimeout(resolve, timeout);
  });
}

var peopleRecords = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Tom' }
];

//simulate an ajax request that will delete a record
function deleteRecord(id) {
  return new Promise(resolve => {
    //simulate network delay
    sleep(1000).then(() => {
      //only keep records that is not id
      people = peopleRecords.filter(record => {
        return record.id != id;
      });

      resolve('deleted successfully');
    });
  });
}

//simulate an ajax request that will get all records
function getAllRecords() {
  return new Promise(resolve => {
    //simulate network delay
    sleep(1000).then(() => {
      resolve(peopleRecords);
    });
  });
}

//assume that after a delete record (id: 1),
//we want to get the list of records
deleteRecord(1)
  .then(res => {
    return getAllRecords();
  })
  .then(res => {
    console.log('records after deleting record: ');
    console.log(res); //(3) [{…}, {…}, {…}]
  });
```

Notice from above that now the asynchronous calls are chained up using `then()`
rather than embedded inside other blocks like
[before](/2-8-promises#callback-hell).

The [Fetch API](/3-1-ajax) (which we will be discussing later in more details)
provides a clean way to perform AJAX requests and uses promises. So, the above
example can be achieved by the following.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', { method: 'DELETE' })
  .then(() => fetch('https://jsonplaceholder.typicode.com/users'))
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
```

Notice how clean the codes look now!

#### Chain with `catch()` instead of defining a failure callback

Instead of supplying a successful callback and a failure callback to `then()`,
it is possible to just supply a successful callback and chain it with `catch()`
which takes in the failure callback.

<iframe height='680' scrolling='no' title='Promise Example 2' src='//codepen.io/hsianghui/embed/wXvgKY/?height=680&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/hsianghui/pen/wXvgKY/'>Promise Example</a> by HsiangHui Lek (<a href='https://codepen.io/hsianghui'>@hsianghui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Async - Await

This is not exactly ES6 syntax, but rather an ES7 feature. ES7 comes with the
`async` - `await` keywords which allow us to write even more concise codes that
look like codes running in a synchronous manner. This syntax works immediately
when we are dealing with `Promise` objects, so existing codes that use the
`Promise` objects can work without much modification.

```javascript
//instead of:
function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

sleep(2000).then(() => {
  console.log('called after 2secs');
});

//after 2 seconds
//"called after 2 secs" is printed

//----------------------------------------

//now with async-await
function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

(async () => {
  //this line will effectively sleep for 2 secs before going to the next line
  await sleep(2000);

  //this will only be executed 2 secs later
  console.log('called after 2secs');
})();
```

The idea is very simple. Given a promise that we want to resolve, we can add an
`await` keyword before it to tell the JS engine to wait for the results to be
available before executing the next statement. Note that we the `await` can only
be used in a function defined with the `async` keyword. So, if we want to write
codes that use `await`, we have to create an `async`
[IIFE](/1-4-scoping#immediately-invoked-function-expression-iife).

```javascript
//async IIFE
(async () => {
  //...
})();

//or

(async function() {
  //...
})();
```

If we need the value resolved from the promise, we can use a variable
assignment.

```javascript
(async () => {
  const results = await fetch('https://jsonplaceholder.typicode.com/users');
  const json = await results.json();
  console.log(json); //[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
})();
```

To handle error cases, we just need to enclose it in `try`-`catch` (similar to
normal JS codes).

```javascript
//simulate an error fetch
(async () => {
  try {
    const results = await fetch('https://some_invalid_url');
    //...
  } catch (e) {
    console.log('Error', e); //Error TypeError: Failed to fetch
  }
})();
```

## `Promise.all`

So far, the codes we have written were executing multiple promises in a
synchronous manner. There are times when we do not want to execute the promises
one after another. Rather, we might want to resolve a list of promise in a
parallel manner. To do this, we could use the `Promise.all` syntax to resolve
all of them in parallel rather than in a sequential manner.

```javascript
var urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3'
];

var peopleRecords = [];

var addPerson = url => {
  return fetch(url)
    .then(res => res.json())
    .then(person => {
      console.log(person);
      peopleRecords.push(person);
    });
};

//an array of promises
var addPersonPromises = urls.map(addPerson);

//resolve all of them (not necessarily resolved in order)
Promise.all(addPersonPromises).then(() => {
  console.log('Finished all promises');
  console.log(peopleRecords); //[{…}, {…}, {…}]
});
```

Since `Promise.all` returns a promise, it is also possible to use the `async` -
`await` together with `Promise.all`.

```javascript
var urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3'
];

var peopleRecords = [];

var addPerson = url => {
  return fetch(url)
    .then(res => res.json())
    .then(person => {
      console.log(person);
      peopleRecords.push(person);
    });
};

//an array of promises
var addPersonPromises = urls.map(addPerson);

//resolve all of them (not necessarily resolved in order)

(async function() {
  await Promise.all(addPersonPromises);
  console.log('Finished all promises');
  console.log(peopleRecords); //[{…}, {…}, {…}]
})();
```

<div>
  <div class='text-left'>
    <a href="/2-7-destructuring">Prev: 2.7 Destructuring</a>
  </div>

  <div class='text-right'>
    <a href="/2-9-module-system">Next: 2.9 Module System</a>
  </div>
</div>
