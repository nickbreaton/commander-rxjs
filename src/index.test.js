import { Option } from 'commander';
import { resolve } from 'path';
import fs from 'fs-promise';
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

describe('docs', () => {

  it('description should match in `README.md` and `package.json`', async () => {
    // read files
    let pkg = await fs.readFile(resolve(__dirname, '../package.json'));
    let readme = await fs.readFile(resolve(__dirname, '../README.md'));
    // parse files
    pkg = JSON.parse(pkg.toString());
    readme = readme.toString();
    // extract description
    pkg = pkg.description;
    let start = '<!-- START_DESCRIPTION -->';
    let end = '<!-- END_DESCRIPTION -->';
    readme = readme.substring(
      readme.indexOf(start) + start.length,
      readme.indexOf(end)
    )
      .replace(/(\[|\]|\(.+?\))/g, '') // remove markdown links
      .trim();
    expect(pkg).toEqual(readme);
  });

});
