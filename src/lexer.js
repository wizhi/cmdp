const makeIterator = require("./iterator");

const tokenSets = {
    number: [
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", "."
    ],
    literal: [
        // ascii lowercase
        "a", "b", "c", "d",
        "e", "f", "g", "h",
        "i", "j", "k", "l",
        "m", "n", "o", "p",
        "q", "r", "s", "t",
        "u", "v", "w", "x",
        "y", "z",
        // ascii uppercase
        "A", "B", "C", "D",
        "E", "F", "G", "H", 
        "I", "J", "K", "L", 
        "M", "N", "O", "P", 
        "Q", "R", "S", "T", 
        "U", "V", "W", "X", 
        "Y", "Z",
        // numbers
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9",
        // special
        "-", "_"
    ]
};

function lex(input) {
    const tokens = [];
    const iterator = makeIterator(input);

    while (iterator.next()) {
        if (iterator.current === " ") {
            continue;
        } else if (iterator.current === "=") {
            tokens.push({
                type: "symbol",
                value: "="
            });
        } else if (iterator.current === "-") {
            iterator.next();

            if (iterator.current === "-") {
                iterator.next();

                tokens.push({
                    type: "flag",
                    value: _scanAllowed(iterator, tokenSets.literal)
                });
            } else {
                const flags = _scanAllowed(iterator, tokenSets.literal);

                flags.split("").forEach(flag => tokens.push({
                    type: "flag",
                    value: flag
                }));
            }
        } else if (iterator.current === "'" || iterator.current === "\"") {
            tokens.push({
                type: "string",
                value: _scanDelimetered(iterator, iterator.current)
            });
        } else if (tokenSets.number.indexOf(iterator.current) !== -1) {
            tokens.push({
                type: "number",
                value: _scanAllowed(iterator, tokenSets.number)
            });
        } else if (tokenSets.literal.indexOf(iterator.current) !== -1) {
            const value = _scanAllowed(iterator, tokenSets.literal);
            
            tokens.push({
                type: value === "true" || value === "false"
                        ? "boolean"
                        : "literal",
                value
            });
        }
    }

    return tokens;
}

function _scanAllowed(iterator, allowed) {
    let result = "";

    while (allowed.indexOf(iterator.current) !== -1) {
        result += iterator.current;

        if (allowed.indexOf(iterator.peek()) === -1) {
            break;
        }

        iterator.next();
    }

    return result;
}

function _scanDelimetered(iterator, delimeter) {
    let result = "";

    while (iterator.next() && iterator.current !== delimeter) {
        result += iterator.current;
    }

    if (iterator.current === undefined) {
        // TODO: Handle end delimeter not found
    }

    return result;
}

module.exports = lex;