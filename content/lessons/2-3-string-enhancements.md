---
title: "2.3 String Enhancements"
---

In ES6, we can use **backticks** (<code class="language-text">\`\`</code>) to
create multi-line strings and to support **template literatals**.

## Multi-line Strings

```javascript
// previously:
const msg1 = 'first line\nsecond line';
console.log(msg1);

//now
//no need to escape new lines using \n
const msg2 = `first line
second line`;
console.log(msg2);
```

## Template literals

More importantly, the **backticks** (<code class="language-text">\`\`</code>)
syntax allows us to do **string interpolation**. What this means is that we can
now embed javascript values in the strings itself without having to concatenate
(`+`) and enclose strings with quotes (`" "` or `' '`). This is achieved using
the `${ variable_or_expression }` in string enclosed by backticks
(<code class="language-text">\`\`</code>)

```javascript
const person = {
  name: 'John',
  location: 'Singapore'
};

const greetings = `Welcome ${person.name}!
I know you are from ${person.location}.
`;

console.log(greetings);
//Welcome John!
//I know you are from Singapore.
```

The string interpolation also works with expressions.

```javascript
console.log(`1 + 1 = ${1 + 1}`);
```

```javascript
function formatMessage(gender, firstName, lastName) {
  return `Hi ${gender === 'M' ? 'Mr' : 'Ms'} ${firstName} ${lastName}`;
}

const msg1 = formatMessage('M', 'John', 'Doe');
console.log(msg1); //Hi Mr John Doe

const msg2 = formatMessage('F', 'Jane', 'Doe');
console.log(msg2); //Hi Ms Jane Doe
```

In addition to expression, it could also be a function call.

```javascript
function foo() {
  return 'foo';
}

console.log(`hello ${foo()}`); //hello foo
```

It is also possible to return another template literal from a template literal.
This can be useful to generate html fragments.

```javascript
const array = ['item1', 'item2', 'item2'];
const list = `<ul>${array.map(item => `<li>${item}</li>`).join('')}</ul>`;
console.log(list); //<ul><li>item1</li><li>item2</li><li>item2</li></ul>
```

## Common Usecases

#### Dealing with strings having both `'` and `"`

```javascript
const html = `
<a href='http://www.yahoo.com'>Yahoo</a>
<a href="http://www.google.com">Google</a>
`;
```

#### More readable strings / codes

```javascript
const name = 'Tom';
const html = `
<div>
  <h1>Hello ${name}!</h1>
  <p>The time is: ${new Date()}</p>
</div>
`;

document.body.innerHTML = html;
```

![](images/template_literals.png 'Template Literals')

#### Dealing with a lot of newlines and tabs

```javascript
const html = `
<pre>
  Chapter 1
    - Section 1.1
      - Subsection 1.1.1
      - Subsection 1.1.2
    - Section 1.2
      - Subsection 1.2.1
    - Section 1.3
      - Subsection 1.3.1
      - Subsection 1.3.2
      - Subsection 1.3.3
  Chapter 2
    - Section 2.1
    - Section 2.2
      - Subsection 2.2.1
    - Section 2.3
</pre>
`;

document.write(html);
```

![](images/template_literals1.png 'Template Literals')

#### Generating URL for AJAX requests

```javascript
function doSearch(keywords, page, limit) {
  const url = `http://somedomain/items?q=${keywords}&page=${page}&limit=${limit}`;

  console.log(url);

  //...
}

doSearch('books', 1, 20);
//http://somedomain/items?q=books&page=1&limit=20
```

## Tagged Template Literals

**Tagged template literals** is an advanced feature which allows you to define a
function to process template literals. It is not essential but can be helpful
for some scenarios.

```javascript
//tagged template literal function to clean bad words ('shit')
function clean(strings, input) {
  const tokens = input.split(' ');
  const cleanInputTokens = tokens.map(t => {
    if (t === 'shit') {
      return '****';
    } else {
      return t;
    }
  });

  return strings[0] + cleanInputTokens.join(' ');
}

const input = "how are you, it's a shit day";
const msg = clean`Message: "${input}"`;

console.log(msg);
//Message: "how are you, it's a **** day
```

It works like a normal function with a name. When we use it with backticks
(<code class="language-text">\`\`</code>) template literals, the function will
get an array of the strings part as the first parameter and the "placeholders"
as one of the function parameters in order. The function can then manipulate the
inputs and return another string (not required to return a string but would
likely want to do that).

```javascript
function tag(strings, name, location) {
  console.log(strings); //["Welcome ", "!↵I know you are from ", ".↵"]
  console.log(name); //John
  console.log(location); //Singapore

  //output the original text
  return strings[0] + name + strings[1] + location + strings[2];
}

const john = {
  name: 'John',
  location: 'Singapore'
};

const greetings1 = tag`Welcome ${john.name}!
I know you are from ${john.location}.
`;
```

#### Sanitize Text / HTML

As seen in the above example on <code class="language-text">clean\`...\`</code>,
other than using it to clean text, it can also be used to clean HTML, stripping
aways HTML codes which might cause security issues.

#### Internationalization

There are libraries (e.g.
<a href="https://github.com/skolmer/es2015-i18n-tag" target="_blank">es2015-i18n-tag</a>)
which allows you to handle internationalization.

<div>
  <div class='text-left'>
    <a href="/2-2-arrow-functions">Prev: 2.2 Arrow Functions</a>
  </div>

  <div class='text-right'>
    <a href="/2-4-es-6-class-system">Next: 2.4 ES6 Class System</a>
  </div>
</div>
