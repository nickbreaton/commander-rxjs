import { Option } from 'commander';
import ObservableCommand from './ObservableCommand';
import program from './index';

describe('exports', () => {

  it('should export a top-level instance of ObservableCommand', () => {
    expect(program).toBeInstanceOf(ObservableCommand);
  });

  it('should also expose the ObservableCommand class', () => {
    expect(program.ObservableCommand).toEqual(ObservableCommand);
  });

  it('should also expose commander\'s Option class', () => {
    expect(program.Option).toEqual(Option);
  });

});
