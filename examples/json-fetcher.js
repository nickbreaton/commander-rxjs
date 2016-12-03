import program from '../src';
import fetch from 'node-fetch';

program
  .arguments('[url]')
  .observe()
  .pluck('args')
  .pluck('url')
  .flatMap(fetch)
  .flatMap(res => res.json())
  .do(console.log) // --> { hello: 'world' }
  .subscribe();

program
  .parse([ 'node', 'json-fetcher', 'http://echo.jsontest.com/hello/world' ]);
