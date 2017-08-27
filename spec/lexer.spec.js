describe("Lexer", function () {
    let lex = require("../src/lexer");

    it("should be able to tokenize literals", function () {
        expect(lex("test")).toEqual([
            { type: "literal", value: "test" }
        ]);
    });

    it("should be able to tokenize strings", function () {
        expect(lex("'test'")).toEqual([
            { type: "string", value: "test" }
        ]);
        expect(lex("\"test\"")).toEqual([
            { type: "string", value: "test" }
        ]);
    });

    it("should be able to tokenize numbers", function () {
        expect(lex("123")).toEqual([
            { type: "number", value: "123" }
        ]);
        expect(lex("1.23")).toEqual([
            { type: "number", value: "1.23" }
        ]);
    });

    it("should be able to tokenize booleans", function () {
        expect(lex("true")).toEqual([
            { type: "boolean", value: "true" }
        ]);
        expect(lex("false")).toEqual([
            { type: "boolean", value: "false" }
        ]);
    });

    it("should be able to tokenize a short option", function () {
        expect(lex("-a")).toEqual([
            { type: "option", value: "a" }
        ]);
    });

    it("should be able to tokenize multiple short options", function () {
        expect(lex("-abc")).toEqual([
            { type: "option", value: "a" },
            { type: "option", value: "b" },
            { type: "option", value: "c" }
        ]);
    });

    it("should be able to tokenize a long option", function () {
        expect(lex("--test-case")).toEqual([
            { type: "option", value: "test-case" }
        ]);
    });
});
