import fs from 'fs';
import path from 'path';
import express from 'express';
import { RenderData, render } from './render';

export interface PresentOptions {
  file: string;
  cwd?: string;
  port?: string;
  theme?: string;
  optionsFile?: string;
  cssFile?: string;
}

export const present = (
  {
    file,
    cwd = process.cwd(),
    port,
    theme,
    optionsFile,
    cssFile,
  }: PresentOptions,
  callback?: () => void
): void => {
  const app = express();
  const router = express.Router();

  const readFileSync = (p: string) =>
    fs.readFileSync(path.join(cwd, p), 'utf8');

  if (!fs.existsSync(path.join(cwd, file))) {
    console.error(`File '${file}' not found!`);
    process.exit(1);
  }

  router.get('/', (_req, res) => {
    let options: RenderData['options'] = {};
    let css = '';

    // no need to try...catch, just throw if fail
    if (optionsFile) {
      options = JSON.parse(readFileSync(optionsFile));
    }
    if (cssFile) {
      css = readFileSync(cssFile);
    }
    const text = readFileSync(file).trim();

    res.set('Content-Type', 'text/html');
    res.send(render({ text, theme, options, css }));
  });

  app.use('/', router);
  app.use(
    '/assets',
    express.static(path.join(__dirname, '../node_modules/reveal.js/'))
  );

  app.listen(Number(port), callback);
};
