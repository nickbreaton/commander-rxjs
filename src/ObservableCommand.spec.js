import ObservableCommand from './ObservableCommand';

beforeEach(() => {
  global.program = new ObservableCommand();
});

test('is observable after command()', () => {
  program
    .command('order [item]')
    .observe()
    .subscribe();
});

test('observes an object with args and options', async () => {
  // create a promise from observable
  const promise = program
    .command('order [item]')
    .option('-t, --two-day-shipping')
    .observe()
    .toPromise();

  // execute fake command
  program
    .parse([ 'node', 'amazon', 'order', 'JavaScript Stickers', '--two-day-shipping' ]);

  // descructure arguments and options for easy expect statements
  const { args, options } = await promise;

  // ensure value of argument is correct
  expect(args.item).toEqual('JavaScript Stickers');
  // ensure flags are translated to options
  expect(options.twoDayShipping).toEqual(true);
});

test('short only options should be capitalized options', async () => {
  // create a promise from observable
  const promise = program
    .command('cmd')
    .option('-x')
    .observe()
    .toPromise();

  // execute fake command
  program
    .parse([ 'node', 'cli', 'cmd', '-x' ]);

  const { options } = await promise;

  // ensure flag is capitalized
  expect(options.X).toEqual(true);
  expect(options.x).toEqual(undefined);
});
