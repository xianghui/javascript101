---
title: "3.1 AJAX"
---

## AJAX

**AJAX** (short for **A**synchronous **J**avascript **A**nd **X**ML) is a way to
send and retrieve data from a server without doing a full page refresh. For
example, we could dynamically fetch data from a server when users type in some
keywords in a textbox, similar to what we see in the autocomplete feature in
Google search engine.

![](images/google_autocomplete.png 'Google Autocomplete')

## XMLHttpRequest Object

In order to achieve asynchronous retrieval from a server in the web browser,
traditionally, we use the `XMLHttpRequest` object. The codes look something like
this:

```javascript
var xhr;
if (window.XMLHttpRequest) {
  //Mozilla, Safari, etc
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  //IE
  try {
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  }
}

//define a handler to process the data when it is available
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById('container1').innerHTML = this.responseText;
  }
};

//define the url and the type of request
xhr.open('GET', 'some_url.jsp');

//actually sending the network request
xhr.send(null);
```

As we can see, it is really tedious to just make an AJAX request. This is
probably what is done 10 years ago before we had
<a href="https://jquery.com/" target="_blank">jQuery</a>. For someone who was
not doing web development before and after AJAX, you would probably not realize
that this is the building blocks of AJAX to begin with. Instead you would have
been using the `$.getJSON()`, `$,post()`, and `$.ajax()` methods provided by
jQuery to do AJAX request.

## Making AJAX request using jQuery

Comparatively, jQuery provided a cleaner approach for making AJAX request.

```javascript
//getPeople.jsp:
[{ name: 'jane', age: 20 }, { name: 'tom', age: 24 }];
```

```javascript
//doing a GET request to get the JSON data from
//getPeople.jsp
$.getJSON('getPeople.jsp', function(data) {
  $.each(data, function(index, person) {
    //success callback
    console.log(person.name);
  });
}).fail(function() {
  //(optional) callback to capture failure case
});
```

There are many tutorials online on examples to make AJAX requests using jQuery.
Even the <a href="http://api.jquery.com/jquery.ajax/" target="_blank">official
documentation page</a> provided many examples as to how to do it. We will not
discuss it much here.

If you wanted a lightweight library to do clean AJAX request without the other
functions that jQuery provides, you can also choose
<a href="https://github.com/axios/axios" target="_blank">axios</a>. It supports
the Promise API.

## Fetch API

More recently, JS has come up with its own built-in API (similar to that of
jQuery and axios) that provided a cleaner way to make AJAX request. It is now
more or less <a href="https://caniuse.com/#feat=fetch" target="_blank">supported
by most modern web browsers</a> nowadays (but if you need it to work for even
older browsers, the safer bet is to use jQuery or axios, or use the
<a href="https://github.com/github/fetch" target="_blank">fetch polyfill</a>).

Since we have already shown some examples of the Fetch API in
[previous sections](/2-2-arrow-functions#code-classlanguage-textthiscode-in-code-classlanguage-textfunctioncode-is-derived-from-the-calling-context),
the syntax should be familiar.

To make a request, we use the `fetch()` function call. This method call will
return a [Promise](/2-8-promises).

```javascript
//to make a GET request to an url
//syntax:
//fetch(url) returns a promise
//resolve the promise by calling the then() method
fetch('https://jsonplaceholder.typicode.com/users/1').then(res => {
  //res = the response object
  console.log(res); //see below
  console.log('status code:', res.status); //print status code : e.g. 200
  console.log('status text:', res.statusText); //print status text
});
```

![](images/promise1.png 'Response Object')

Notice that `res` is really just another `Promise` object. From this object, it
is possible to get some of response related information (e.g. status code). To
get the body of the fetch request, we can then resolve this `Promise` object by
chaining it with another `then()`. For example, if the response is JSON, we can
call `res.json()` which will return another promise, and finally call `then()`
again to resolve this new promise in order to get the JSON object.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => {
    return res.json();
  })
  .then(json => {
    console.log(json);
    //object:
    //{id: 1, name: "Leanne Graham", … }
  });

//or simply just
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.json())
  .then(json => {
    console.log(json);
    //object:
    //{id: 1, name: "Leanne Graham", … }
  });
```

Note that we cannot just do `console.log(res.json())`. We need to resolve the
promise in order to get the JSON object.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1').then(res => {
  const json = res.json();
  console.log(json);
  //Promise {<resolved>: {…}}
});
```

#### Working with Text

Suppose the URL returns text rather than JSON, it is also possible to call the
`text()` method.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.text())
  .then(text => {
    console.log(text);
    //return text rather than object
  });
```

#### Working with Binary

There is also a `blob()` for fetching binary type (e.g. images).

```javascript
fetch('some_image.jpg')
  .then(res => res.blob())
  .then(data => {
    //...
  });
```

## Other Request Options

So far, the above `fetch()` calls deal with only **GET** requests. It is
possible to do other types of requests (e.g. POST, DELETE, etc).

#### Sending data

Suppose we want to do a **POST** request, and send some data to a RESTful API.
We can still use the `fetch()` method but now supplying a second parameter
containing a `method` property and a `body` property. `JSON` is an object with 2
useful methods: `stringify()` and `parse()`. `stringify()` allows us to convert
a JS object into a JSON string. Conversely, `parse()` allows us to convert a
JSON string into a JS object.

```javascript
//data to send
const data = { name: 'John' };
fetch('https://jsonplaceholder.typicode.com/users', {
  //body is use to capture the data to be sent
  //sending post data as a json string
  body: JSON.stringify(data),

  //POST request
  method: 'POST'
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
    //{id: 11}
  });

console.log(JSON.stringify(data));
//{"name":"John"}
```

We can also choose not to do `JSON.stringify(data)` for the `body` property.
This will be as if it were a Form POST with a field called `name` and value
`John`.

```javascript
//data to send
const data = { name: 'John' };
fetch('https://jsonplaceholder.typicode.com/users', {
  //similar to posting to:
  //https://jsonplaceholder.typicode.com/users?name=john
  body: data,
  method: 'POST'
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
    //{id: 11}
  });
```

If we need to upload a file (e.g. getting data from `<input type="file" />`, it
is possible to use the `FormData` object.

```javascript
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append('some_field', 'some_value');
formData.append('profile_image', fileField.files[0]);

fetch('https://jsonplaceholder.typicode.com/users', {
  body: formData,
  method: 'POST'
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
```

#### Other types of request

When dealing with RESTful API, it is quite common that we will deal with other
types of methods such as `PUT`, `DELETE`, `PATCH`, etc. We can modify the
`method` property accordingly.

```javascript
//e.g. of a DELETE request
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
    //{}
  });
```

#### `headers` property

We can also use the `headers` property to supply any header. This is used for
example to indicate expected content type or to supply authorization tokens.

```javascript
//specify headers
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
```

```javascript
//specify headers
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer SOME_TOKEN_STRING'
  }
})
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
```

#### Error Handling

Error handling while using the Fetch API is the same as how we would for normal
Promises by using `catch()`.

```javascript
fetch('http://invalid_url')
  .then(res => res.json())
  .then(json => {
    console.log(json);
  })
  .catch(err => {
    console.log('Error: ', err);
    //Error:  TypeError: Failed to fetch
  });
```

## Cross-Origin Resource Sharing (CORS)

When dealing with AJAX request to a webserver, one thing to take note is by
default, web browsers will prevent you from fetching content from another domain
name (or same domain name with different ports) using AJAX. For example, if our
webpage is at http://www.mydomain.com/index.jsp and we are trying to `POST` to
http://www.anotherdomain.com/person, it is quite likely that the browser will be
unable to successfully execute the POST AJAX request due to security reasons.

In order to tell the browser to allow such a scenario to happen, the webserver
at http://www.anotherdomain.com/ has to enable the additional CORS headers
explicitly indicating that it can do the request from http://www.domain.com. The
steps to enable this CORS will differ depending on the webserver backend
technology used. There are various tutorials online discussing the steps
depending on the backend technology used and you are encouraged to Google when
there is a need to allow such a scenario.

<div>
  <div class='text-left'>
    <a href="/2-9-module-system">Prev: 2.9 Module System</a>
  </div>

</div>
