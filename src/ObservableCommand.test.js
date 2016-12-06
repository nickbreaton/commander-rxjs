import ObservableCommand from './ObservableCommand';

const program = new ObservableCommand();

describe('observablility', () => {

  it('should be observable after `arguments()`', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const value = program
      .arguments('[num]')
      .observe()
      .pluck('args')
      .pluck('num')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', '10']);
    // await value of observable
    expect(await value).toEqual('10');
  });

  it('should be observable after `command()`', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const value = program
      .command('value [num]')
      .observe()
      .pluck('args')
      .pluck('num')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', 'value', '50']);
    // await value of observable
    expect(await value).toEqual('50');
  });

  it('should be observable after `command()` then `option()`', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const value = program
      .command('value [num]')
      .option('-s, --skip')
      .observe()
      .pluck('args')
      .pluck('num')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', 'value', '300']);
    // await value of observable
    expect(await value).toEqual('300');
  });

});

describe('arguments', async () => {

  it('should camel case dashed arguments', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const args = program
      .arguments('[try-again]')
      .observe()
      .pluck('args')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', 'true']);
    // await value of observable
    expect(await args).toEqual({ tryAgain: 'true' });
  });

});

describe('options', () => {

  it('should camel case dashed options', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const options = program
      .command('cmd')
      .option('--skip-install')
      .observe()
      .pluck('options')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', 'cmd', '--skip-install']);
    // await value of observable
    expect(await options).toEqual({ skipInstall: true });
  });

  it('should have an uppercase option for single character flag', async () => {
    const program = new ObservableCommand();
    // observe after arguments
    const options = program
      .arguments('[num]')
      .option('-t')
      .observe()
      .pluck('options')
      .toPromise();
    // execute
    program
      .parse(['node', 'program', '20', '-t']);
    // await value of observable
    expect(await options).toEqual({ T: true });
  });

});
