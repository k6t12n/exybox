[![Exybox Logo](https://firebasestorage.googleapis.com/v0/b/enalyticon.appspot.com/o/exybox-01.svg?alt=media)](https://github.com/k6t12n/exybox)

[Exybox-CLI](https://www.npmjs.com/package/express) - Helper tool for your Nodejs development.

[![NPM Version][npm-image]][npm-url]  [![License][license-imge]][license-url] ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

## Installation

```sh
npm install -g @k6t12n/exybox
```

## Quick Overview

Create new app:
```sh
npx @k6t12n/exybox create:app --template exybox-typescript my-app
cd my-app
yarn dev
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

![Starter page](https://firebasestorage.googleapis.com/v0/b/enalyticon.appspot.com/o/starter_page.png?alt=media)


## Command Line Options

Using Exybox-CLI, you can configure your project and create module with multiple commands and options.

    $ exybox -h
    Usage: exybox [options] [command]

    Options:
    -V, --version                        output the version number
    -h, --help                           display help for command

    Commands:
    create:app [options] <project_name>  Create New Exybox project from template
    create:file [options] <file_path>    Create new file based on template, default will be js file
    help [command]                       display help for command

## Available templates
* [exybox-typescript](https://github.com/k6t12n/exybox-typescript-template)
* [react-redux-starter](https://github.com/k6t12n/exybox-cra-redux-starter)
* [exybox-typescript-ts](https://github.com/k6t12n/exybox-cra-redux-starter-ts)

## Contributions
Loving the project? Please feel free to contribute to this project. Whether it's suggestions, features, code refactors, testing, any help is welcome.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@k6t12n/exybox.svg
[npm-url]: https://npmjs.org/package/@k6t12n/exybox
[license-imge]: https://img.shields.io/npm/l/@k6t12n/exybox
[license-url]: https://github.com/k6t12n/exybox/blob/main/LICENSE
