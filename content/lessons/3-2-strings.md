---
title: "3.2 Strings"
---

##ES 2017 String Padding

ES 2017 introduces 2 useful string methods: `padStart()` and `padEnd()`.

```javascript
//right aligning
const words = ['hello', 'there', 'how', 'are', 'you'];
for (let i = 0; i < words.length; i++) {
  //pad empty spaces if word is less than 5 characters
  console.log(words[i].padStart(5));
}

/*
hello
there
  how
  are
  you
*/
```

This can be useful for formatting date components

```javascript
const now = new Date();
const d = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`;

// the month or day can be single digit
console.log(d);

//this will ensure that is leading 0 if single digit
const month = (now.getMonth() + 1 + '').padStart(2, '0');
const day = (now.getDay() + '').padStart(2, '0');
const d1 = `${now.getFullYear()}-${month}-${day}`;
console.log(d1);
```

`padEnd()` is the same idea except it will pad the end.

```javascript
//can be used for formatting data
const people = [
  {
    id: 1,
    name: 'John',
    hobby: 'Coding'
  },
  {
    id: 2,
    name: 'Tom',
    hobby: 'Surfing'
  }
];

people.forEach(p => {
  console.log(`${p.name.padEnd(10)}${p.hobby}`);
});
/*
John      Coding
Tom       Surfing
*/
```

<div>
  <div class='text-left'>
    <a href="/3-1-ajax">Prev: 3.1 AJAX</a>
  </div>

</div>
