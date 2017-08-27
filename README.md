# cmdp - a simple command parser

`cmdp` is a simple tool for parsing commandline like inputs. This project was made overnight for the fun of it, with no intentions of being used seriously, but feel free to play around with it - and submit an issue if you find any.

In it's current state, `cmdp` will silently ignore errors found in the command syntax, and attempt to parse what can be parsed.

## Installation

`cmdp` is [available on npm](https://www.npmjs.com/package/cmdp), and may be installed from there.

    npm install cmdp

## Usage

`cmdp` consists of two things:

1. the lexer
2. the parser

Overall, it's a simple two-step process of turning some input into tokens using the lexer, which are then passed to the parser, that turns them into a command structure.

    const cmdp = require("cmdp");

    const tokens = cmdp.lex("npm install --save cmdp");
    const command = cmdp.parse(tokens);

The `command` structure in this case will look like this:

    {
        name: "npm",
        arguments: ["install", "cmdp"],
        options: [{ name: "save", value: undefined }]
    }

`cmdp`'s module may also be called directly, which will parse the first argument and output the result.

    $ ./index.js "npm install --save cmdp"
    { name: 'echo', arguments: [ 'hello world' ], options: [] }

### Input format

`cmdp`'s input format is pretty standard.

    <command> [argument] [(-|--)option[=value]]

An input must begin with a literal, which will be treated as the command name. Following the command name, will be either arguments or options.

Options are any literals, which are prefixed with either `-` or `--`. Everything else will be treated as an argument. Arguments and options are seperated by spaces.

`cmdp` treats options as completely seperate things from arguments, and doesn't care about where they might occur in the input, so long as it's after the command name. Arguments will be listed in the order in which they occur in the input.

Options come in short and long formats, prefixed with `-` and `--` respectively. Long format options may contain `-` for clarity, eg. `--save-dev`. Short options consist of only a single character. Both types may specify an associated value with `=`, followed by any value type. Short options may be grouped, but in this case if a value is specified, it will be associated with the last option only.

`cmdp` will recognize the type of any value, and convert them to their correct JavaScript counterpart. Currently the following are supported:

| name    | format            | description                                                    | type    |
|---------|-------------------|----------------------------------------------------------------|---------|
| literal | `[a-zA-Z0-9\-_]+` | any single group of characters                                 | string  |
| string  | `("|')(.*?)("|')` | any character between a set of matching delimeters, `'` or `"` | string  |
| number  | `[0-9\.]+`        | any number using a dot for decimal seperation                  | number  |
| boolean | `(true|false)`    | either one when not inside of string delimeters                | boolean |
| null    | `null`            | a literal null not inside of string delimeters                 | null    |

### Command structure

The structure of a parsed command was already shown in the above example, but in detail it will contain:

| property  | type             | description                                                            |
|-----------|------------------|------------------------------------------------------------------------|
| name      | string           | the name of the command                                                |
| arguments | Array.\<mixed\>  | the argument values                                                    |
| options   | Array.\<object\> | options without their "-" or "--" prefixes, and their associated value |

An option consists of a `name` and a `value`. `name` will always be a string, while `value` will be a mixed type, or undefined.

## Examples

The following are the results of different inputs, which have been lexed and parsed as shown above.

**"Hello world"**

    echo "Hello world"

    {
        name: 'echo',
        arguments: ['Hello world'],
        options: []
    }
    
**"Hello world" alternate**

    echo Hello world

    {
        name: 'echo',
        arguments: ['Hello', 'world'],
        options: []
    }

**Options**

    ls -l --color=auto
    
    {
        name: 'ls',
        arguments: [],
        options: [
            {
                name: 'l',
                value: undefined
            },
            {
                name: 'color',
                value: 'auto'
            }
        ]
    }

**Option groups**

    ps -aux

    {
        name: 'ps',
        arguments: [],
        options: [
            {
                name: 'a',
                value: undefined
            },
            {
                name: 'u',
                value: undefined
            },
            {
                name: 'x',
                value: undefined
            }
        ]
    }

**Proper value types**

    is 42.123 "the meaning of life" false or null

    {
        name: 'is',
        arguments: [42.123, 'the meaning of life', false, 'or', null],
        options: []
    }

## Tests

`cmdp` uses [jasmine](https://jasmine.github.io/) for testing purposes.

Tests may be found in the `spec/` directory. Running then is as simple as `npm test`.

The amount of tests are currently limited, but more will be added (maybe).