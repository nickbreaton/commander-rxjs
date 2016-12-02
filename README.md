# commander-rxjs

A simple adapter to easily use RxJS with commander.

## Installation

```
$ npm install commander rxjs commander-rxjs
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
    console.log(command.params);  // --> { food: "applesauce" }
    console.log(command.options); // --> { noChew: true }
  })
  .subscribe();           // RxJS function

// INPUT: your-app eat applesauce --no-chew
program
  .parse(process.argv)
```
