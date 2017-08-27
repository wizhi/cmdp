const lex = require('./src/lexer');
const parse = require('./src/parser');

module.exports = {
    lex,
    parse
};

if (require.main === module) {
    const input = process.argv[2];

    if (input === undefined) {
        console.log("Usage: ./index.js <command>");
        return;
    }

    const tokens = lex(input);
    const command = parse(tokens);
    
    console.log(command);
}