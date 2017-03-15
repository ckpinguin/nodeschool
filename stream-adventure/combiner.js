var combine = require('stream-combiner');
var zlib = require('zlib');
var split = require('split');
var through = require('through2'); // obj is needed to work!

// got this from reference solution (aka I was cheating)
module.exports = function() {
    var grouper = through(write, end);
    var current;

    function write (line, _, next) {
        if (line.length === 0) return next();
        var row = JSON.parse(line);

        if (row.type === 'genre') {
            if (current) {
                this.push(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] };
        }
        else if (row.type === 'book') {
            current.books.push(row.name);
        }
        next();
    }
    function end (next) {
        if (current) {
            this.push(JSON.stringify(current) + '\n');
        }
        next();
    }

    return combine(split(), grouper, zlib.createGzip());
};
