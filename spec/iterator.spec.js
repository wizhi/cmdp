describe("Iterator", function () {
    const makeIterator = require('../src/iterator');

    it("should indicate if it's able to proceed", function () {
        const string = "abc";
        const iterator = makeIterator(string);

        for (var i = 0; i < string.length; i++) {
            expect(iterator.next()).toBe(true);
        }

        expect(iterator.next()).toBe(false);
    });

    it("should not be able to proceed on an empty iteratable", function() {
        expect(makeIterator("").next()).toBe(false);
    })

    it("should iterate all characters of a string", function () {
        const string = "hello world";
        const iterator = makeIterator(string);
        let iterations = 0;
        
        while (iterator.next()) {
            iterations++;
        }

        expect(iterations).toBe(string.length);
    });

    it("should set the hasMore flag correctly", function() {
        const iteratable = [1, 2, 3, 4];
        const iterator = makeIterator(iteratable);

        expect(iterator.hasMore).toBe(true);

        for (let i = 0; i < iteratable.length; i++) {
            iterator.next();
        }

        expect(iterator.peek()).toBe(undefined);
        expect(iterator.hasMore).toBe(false);
    })

    it("should set the current iteration value correctly", function () {
        const iteratable = [1, 2, 3, 4];
        const iterator = makeIterator(iteratable);
        const indexToTestAgainst = 2;

        for (let i = 0; i <= indexToTestAgainst; i++) {
            iterator.next();
        }

        expect(iterator.current).toBe(iteratable[indexToTestAgainst]);
    });
});
