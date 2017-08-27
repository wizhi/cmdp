const makeIterator = require("./iterator");

function parse(tokens) {
    const nameToken = tokens.shift();

    if (nameToken.type !== "literal") {
        throw new Error("Parsing error: command name must a literal");
    }

    const command = {
        name: nameToken.value,
        arguments: [],
        options: []
    };
    const iterator = makeIterator(tokens);

    while (iterator.next()) {
        if (iterator.current.type === "option") {
            const option = {
                name: iterator.current.value,
                value: undefined
            };

            if (iterator.hasMore) {
                if (iterator.peek().type === "symbol") {
                    iterator.next();
                    option.value = getValue(iterator.peek());
                }
            }

            command.options.push(option);
        } else {
            command.arguments.push(getValue(iterator.current));
        }
    }

    return command;
}

function getValue(token) {
    switch (token.type) {
        case "number":
            return Number(token.value);
        case "boolean":
            return token.value === "true";
        case "literal":
            if (token.value === "null") {
                return null;
            }
        default:
            return token.value;
    }
}

module.exports = parse;