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

export const render = (data: RenderData): string => {
  const { text, theme = 'black', options = {}, css } = data;
  // a naive way to extract title
  const title = text.slice(0, text.indexOf('\n')).replace(/^#+/, '');
  const {
    separator = '^\r?\n---\r?\n$',
    separatorVertical = '^\r?\n--\r?\n$',
    notes = '^notes?:',
    ...rest
  } = options;
  const revealOptions = JSON.stringify(rest);
  const style = css ? `<style type="text/css">${css}</style>` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>${title}</title>

        <link rel="stylesheet" href="assets/dist/reset.css">
        <link rel="stylesheet" href="assets/dist/reveal.css">
        <link rel="stylesheet" href="assets/dist/theme/${theme}.css" id="theme">
        <link rel="stylesheet" href="assets/plugin/highlight/monokai.css">
        ${style}
      </head>
      <body>
        <div class="reveal">
          <div class="slides">
            <section data-markdown data-separator="${separator}" data-separator-vertical="${separatorVertical}" data-notes="${notes}">
              <textarea data-template>${text}</textarea>
            </section>
          </div>
        </div>

        <script src="assets/dist/reveal.js"></script>
        <script src="assets/plugin/markdown/markdown.js"></script>
        <script src="assets/plugin/highlight/highlight.js"></script>
        <script src="assets/plugin/notes/notes.js"></script>

        <script>
          Reveal.initialize(Object.assign({
            hash: true,
          }, ${revealOptions}, {
            plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
          }));
        </script>
      </body>
    </html>
  `;
};
