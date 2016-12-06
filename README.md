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
  .command('order [item]')       
  .option('--two-day-shipping')  
  .observe()                     
  .do(command => {               
    console.log(command.args, command.options);     
    // --> { item: "JavaScript Stickers" }
    // --> { twoDayShipping: true }
  })
  .subscribe();                  

// INPUT: amazon-cli order "JavaScript Stickers" --two-day-shipping
program
  .parse(process.argv)
```

## Examples

Be sure to checkout all of the [examples](https://github.com/nickbreaton/commander-rxjs/tree/master/examples).

Then can easily be run by `npm run example:[example-name]`.
