# commander-rxjs

  <!-- NPM: -->
<a href="https://www.npmjs.com/package/commander-rxjs">
  <img src="https://img.shields.io/npm/v/commander-rxjs.svg?style=flat"/>
  <!-- TravisCI: -->
</a><a href="https://travis-ci.org/nickbreaton/commander-rxjs">
  <img src="https://img.shields.io/travis/nickbreaton/commander-rxjs/master.svg?style=flat"/>
</a>

A simple adapter to easily use [RxJS](https://github.com/ReactiveX/RxJS) with [commander](https://github.com/tj/commander.js).

## Installation

```
$ npm install rxjs commander

$ npm install commander-rxjs
```

## Convert commands to observables

At anytime in the commander process, an `observe()` function can be chained providing an RxJS observable when the command is executed.

```js
import program from 'commander-rxjs';

program
  .command('eat [food]')  // commander function
  .option('--no-chew')    // commander function
  .observe()              // convert to observable stream
  .do(command => {        // RxJS function
    console.log(command.args);    // --> { food: "applesauce" }
    console.log(command.options); // --> { noChew: true }
  })
  .subscribe();           // RxJS function

// INPUT: your-app eat applesauce --no-chew
program
  .parse(process.argv)
```
