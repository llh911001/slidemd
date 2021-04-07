# Slidemd

A fast and lightweight CLI tool to present your Markdown. (Powered by [reveal.js](https://revealjs.com/) and [express.js](https://expressjs.com/))

## Why?

[reveal.js](https://revealjs.com/) is a fantastic presentation tool with built-in Markdown support (and many other features), only it can be a little hassle to present external Markdown files. After trying out [reveal-md](https://github.com/webpro/reveal-md), which is also great, I personally find it a little heavy.

So here comes Slidemd. It's tiny, and fully-featured.

## Installation

```sh
npm i -g slidemd
# or
yarn add -g slidemd
```

The installation can be skipped if you're using [npx](https://github.com/npm/npx).

## Usage

```sh
slidemd /path/to/your/slides.md
# or, for npx users
npx slidemd path/to/your/slides.md
```

Then your default browser will automatically open [http://localhost:8080](http://localhost:8080).

Happy presenting!

## CLI options

For simplicity's sake, Slidemd doesn't feature a load of CLI options, only some "must-have" ones.

Run `slidemd -h` to list the supported CLI options:

```sh
$ slidemd -h
Usage: slidemd [options] <file>

A fast and lightweight CLI tool to present your Markdown.

Options:
  -V, --version                    output the version number
  -p, --port <port>                port number of the local server (default: "8080")
  -t, --theme <theme>              theme of the slides (default: "black")
  -o, --optionsFile <optionsFile>  JSON file of reveal.js config and additional options
  -c, --cssFile <cssFile>          CSS file of custom styles to a specified theme
  -h, --help                       display help for command
```

### `--theme`
> alias: `-t`
> required: ✗
> default: `black`

`--theme` specifies a [built-in theme](https://revealjs.com/themes/) of your slides. You can pass a CSS file via `--cssFile` option to add some custom styles to your slides.

If a [custom theme](https://revealjs.com/themes/#creating-a-theme) is what you need, you'll have to follow [reveal.js's official guide](https://revealjs.com/installation).

### `--port`
> alias: `-p`
> required: ✗
> default: `8080`

`--port` determines the port number of the local server that Slidemd creates after running `slidemd`.

### `--optionsFile`
> alias: `-o`
> required: ✗

reveal.js exposes a wide range of [customizable config options](https://revealjs.com/config/) to customize presentation behaviors, and Slidemd supports them all.

To configure reveal.js options, specify them (like `progress`, `controls`,  and so on) in a JSON file via the `--optionsFile` CLI option.

```sh
slidemd /path/to/your/slides.md -o /path/to/your/optionsFile.json
```

In additional to reveal.js [built-in configurations](https://revealjs.com/config/), there are some **extra options** you can put in the JSON file:

| Config option | Default value | Description |
| ------ | ------ | ------ |
| `separator` | `^\r?\n---\r?\n$` | regex for [horizontal](https://revealjs.com/markdown/#external-markdown) slides  |
| `separatorVertical` | `^\r?\n--\r?\n$` | regex for [vertical](https://revealjs.com/markdown/#external-markdown) slides |
| `notes` | `^notes?:` | regex for [speaker view](https://revealjs.com/speaker-view/) notes |

### `--cssFile`
> alias: `-c`
> required: ✗

`--cssFile` specifies a local CSS file to add some more custom styles to your selected theme.

## reveal.js

Here are some notes on how Slidemd configures and initializes reveal.js.

### Plugins

Slidemd enables the following reveal.js [plugins](https://revealjs.com/plugins):

- [RevealMarkdown](https://revealjs.com/markdown/) - that's why Slidemd even exists, isn't it?
- [RevealHighlight](https://revealjs.com/code/) - how could we hackers not show code in our slides?
- [RevealNotes](https://revealjs.com/speaker-view/) - sometimes you need tips when presenting, that's fine.

Sorry but it's not possible to customize plugins using Slidemd, if you need more fine-grained customization, please checkout [reveal.js's official guide](https://revealjs.com/installation).

### Markdown

Slidemd uses reveal.js's [`data-` attributes](https://revealjs.com/markdown/#external-markdown) under the hood to specify how a Markdown file's slides are delimited.

The default values are:

- `data-separator` - `^\r?\n---\r?\n$`
- `data-separator-vertical` - `^\r?\n--\r?\n$`

> To customize, see `--options` for more details.

### Speaker notes

`RevealNotes` plugin is used for [speaker view](https://revealjs.com/speaker-view/), and the regex to determine notes is:

- `data-separator-notes` - `^notes?:`

> To customize, see `--options` for more details.

## NodeJS API

Slidemd also exposes a NodeJS API to present your Markdown.

```typescript
import slidemd from 'slidemd';

// Create a local server to present your Markdown file
slidemd(
  options: {
    // file path, will be resolved relative to `options.cwd`
    file: string;
    // current working dir, defaults to `process.cwd()`
    cwd?: string;
    port?: string;
    theme?: string;
    // options JSON file, same as `--optionsFile` CLI option
    optionsFile?: string;
    // CSS file, same as `--cssFile` CLI option
    cssFile?: string;
  },
  callback?: () => void
);
```

## License

MIT
