import fs from 'fs';
import path from 'path';

export interface RenderData {
  text: string;
  theme?: string;
  options?: {
    separator?: string;
    separatorVertical?: string;
    notes?: string;
    [key: string]: unknown;
  };
  css?: string;
}

const readFileSync = (p: string) => {
  return fs.readFileSync(path.join(__dirname, '../node_modules/reveal.js/', p), 'utf8');
};

export const render = (data: RenderData): string => {
  const { text, theme = 'black', options = {}, css = '' } = data;
  // a naive way to extract title
  const title = text.slice(0, text.indexOf('\n')).replace(/^#+/, '');
  const {
    separator = '^\r?\n---\r?\n$',
    separatorVertical = '^\r?\n--\r?\n$',
    notes = '^notes?:',
    ...rest
  } = options;
  const revealOptions = JSON.stringify(rest);

  const resetCSS = readFileSync('dist/reset.css');
  const revealCSS = readFileSync('dist/reveal.css');
  const themeCSS = readFileSync(`dist/theme/${theme}.css`);
  const monokaiCSS = readFileSync('plugin/highlight/monokai.css');
  const revealJS = readFileSync('dist/reveal.js');
  const markdownJS = readFileSync('plugin/markdown/markdown.js');
  const highlightJS = readFileSync('plugin/highlight/highlight.js');
  const notesJS = readFileSync('plugin/notes/notes.js');

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <style>${resetCSS}</style>
    <style>${revealCSS}</style>
    <style>${themeCSS}</style>
    <style>${monokaiCSS}</style>
    <style>${css}</style>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section data-markdown data-separator="${separator}" data-separator-vertical="${separatorVertical}" data-notes="${notes}">
          <textarea data-template>${text}</textarea>
        </section>
      </div>
    </div>
    <script>${revealJS}</script>
    <script>${markdownJS}</script>
    <script>${highlightJS}</script>
    <script>${notesJS}</script>
    <script>
      Reveal.initialize(Object.assign({
        hash: true,
      }, ${revealOptions}, {
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
      }));
    </script>
  </body>
</html>`;
};
