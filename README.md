# commander-rxjs

<!-- npm -->[![](https://img.shields.io/npm/v/commander-rxjs.svg?style=flat)](https://www.npmjs.com/package/commander-rxjs) 
<!-- travisci -->[![](https://img.shields.io/travis/nickbreaton/commander-rxjs/master.svg?style=flat)](https://travis-ci.org/nickbreaton/commander-rxjs)
<!-- codecov --> [![](https://img.shields.io/codecov/c/github/nickbreaton/commander-rxjs.svg?style=flat)](https://codecov.io/gh/nickbreaton/commander-rxjs)

A simple adapter to easily use [RxJS](https://github.com/ReactiveX/RxJS) with [commander](https://github.com/tj/commander.js).

## Installation

```
$ npm install commander-rxjs
```

**Note:** `commander` and `rxjs` are both specified as peer dependencies. You must install them alongside `commander-rxjs`.

```
$ npm install commander rxjs
```

## Convert commands to observables

`commander-rxjs` provides a `.observe()` function to convert commands an RxJS observable.

**Note:** The `.observe()` can be used any place commander's `.action(cb)` function can be used.

```js
import program from 'commander-rxjs';

program
  .command('order [item]')       // commander function
  .option('--two-day-shipping')  // commander function
  .observe()                     // convert to observable stream
  .do(command => {               // RxJS function
    console.log(command.args);     // --> { item: "JavaScript Stickers" }
    console.log(command.options);  // --> { twoDayShipping: true }
  })
  .subscribe();                  // RxJS function

// INPUT: amazon-cli order "JavaScript Stickers" --two-day-shipping
program
  .parse(process.argv)
```
