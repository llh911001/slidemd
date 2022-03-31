#!/usr/bin/env node

import { program } from 'commander';
import open from 'open';
import { present } from './present';

/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../package.json');

program
  .version(pkg.version)
  .description('A fast and lightweight CLI tool to present your Markdown.')
  .arguments('<file>')
  .option('-p, --port <port>', 'port number of the local server', '8080')
  .option('-t, --theme <theme>', 'theme of the slides', 'black')
  .option('-o, --optionsFile <optionsFile>', 'JSON file of reveal.js config and additional options')
  .option('-c, --cssFile <cssFile>', 'CSS file of custom styles to a specified theme')
  .parse(process.argv);

const { args } = program;
const opts = program.opts();

if (args.length === 0) {
  // display help info and exit
  program.help();
}

present(
  {
    ...opts,
    file: args[0],
  },
  () => {
    const url = `http://localhost:${opts.port}`;
    console.log(`Opening ${url} ...`);
    open(url);
  }
);
