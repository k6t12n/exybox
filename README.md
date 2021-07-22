[![Exybox Logo](https://firebasestorage.googleapis.com/v0/b/enalyticon.appspot.com/o/exybox-01.svg?alt=media)](https://github.com/k6t12n/exybox)

[Exybox-CLI](https://www.npmjs.com/package/express) - Helper tool for your Nodejs development.

## Installation

```sh
npm install -g exybox
```

## Quick Overview

Create new app:
```sh
npx exybox create:app -t exybox-typescript my-app
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


## License

[MIT](LICENSE)

