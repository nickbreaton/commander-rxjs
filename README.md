# commander-rxjs

[![NPM Version](https://img.shields.io/npm/v/commander-rxjs.svg?style=flat-square)](https://www.npmjs.com/package/commander-rxjs)
[![TravisCI](https://img.shields.io/travis/nickbreaton/commander-rxjs/master.svg?style=flat-square)](https://travis-ci.org/nickbreaton/commander-rxjs)
[![Codecov](https://img.shields.io/codecov/c/github/nickbreaton/commander-rxjs.svg?style=flat-square)](https://codecov.io/gh/nickbreaton/commander-rxjs)

<!-- START_DESCRIPTION -->

A simple adapter to easily use [RxJS](https://github.com/ReactiveX/RxJS) with [commander](https://github.com/tj/commander.js).

<!-- END_DESCRIPTION -->

## Installation

```
$ npm install commander-rxjs
```

**Important:** `commander` and `rxjs` are both peer dependencies. You must install them alongside `commander-rxjs`.

```
$ npm install commander rxjs
```

## API

### `ObservableCommand`

`commander` exports an instance of a `Command`:

```js
import program from 'commander';

program
  .command('example')
  .action(options => {
    // do stuff
  });

program
  .parse(proces.argv);
```

`commander-rxjs` exports an instance of a wrapped `Command` known as an `ObservableCommand`.

The `ObservableCommand` has the exact same API as a `Command`, with the addition of one function, `observe()`, which is used in place of the `.action()` function:

```js
import program from 'commander-rxjs';

program
  .command('example')
  .observe()
  // ... do stream stuff
  .subscribe();

program
  .parse(proces.argv);
```

### `observe()`

returns an RxJS observable stream with the following data:

```js
{
  args: {
    'camelCasedArgument': 'value',
    '...': '...'
  },
  options: {
    'camelCasedOption': 'value',
    '...': '...'
  },
  command: Command // (commander raw command)
}
```

## Examples

Be sure to checkout all of the [examples](https://github.com/nickbreaton/commander-rxjs/tree/master/examples). They can easily be run with `npm run example:[example]`.
