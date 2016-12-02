import ObservableCommand from './ObservableCommand';

beforeEach(() => {
  global.program = new ObservableCommand();
});

test('is observable immediatly', () => {
  program
    .observe()
    .subscribe();
});

test('is observable after command()', () => {
  program
    .command('order [item]')
    .observe()
    .subscribe();
});

test('is observable after option()', () => {
  program
    .option('-q, --quantity [num]')
    .observe()
    .subscribe();
});

test('observes an object with params', async () => {
  const promise = program
    .command('eat [food]')
    .observe()
    .pluck('params')
    .pluck('food')
    .toPromise();

  program.parse(['node', 'script', 'eat', 'pizza']);

  expect(await promise).toBe('pizza');
});
