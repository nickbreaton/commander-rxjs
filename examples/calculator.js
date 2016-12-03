import program from '../src';

program
  .command('add <nums...>')
  .observe()
  .pluck('args')
  .pluck('nums')
  .flatMap(nums => nums)
  .map(num => parseInt(num))
  .reduce((sum, num) => sum + num, 0)
  .do(console.log) // --> 30
  .subscribe();

program
  .parse([ 'node', 'calculator', 'add', '10', '20' ]);
