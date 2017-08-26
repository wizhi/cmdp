function makeIterator(iteratable) {
    let index = -1;

    if (iteratable === undefined) {
        throw new TypeError("iteratable must be defined");
    }

    return {
        get current() {
            return iteratable[index];
        },
        get index() {
            return index;
        },
        get hasMore() {
            return (index + 1) < iteratable.length;
        },
        peek: function() {
            return iteratable[index + 1];
        },
        next: function() {
            if (++index < iteratable.length) {
                // index++;
                return true;
            }

            return false;
        }
    }
}

module.exports = makeIterator;