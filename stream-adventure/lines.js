var through = require('through');
var split = require('split');

// Well, I cheated here, I got this solution from
// https://github.com/jeremy-w/node-stream-adventure-solutions/blob/master/lines.js
// There was no obvious way to use variables to check for modulo 2 or so...

// "Give me 2 functions and I return a function, that calls one of them and
// then next time the other etc."
const alternate_fn = function(odd_fn, even_fn) {
    // we start with even (at 0)
    let f = even_fn; // closed over by returned anon. function below
    // the returned function has closure over f, so it can be set by
    // consecutive calls of that function (so we actually have a state!)
    return function(buffer) {
        f = (f === even_fn) ? odd_fn : even_fn;
        f.call(this, buffer); // `this` will be the string on which f is called
    };
};

// "Give me a string function and I will return a function, that works on a
// buffer calling the string function on that buffer and putting the
// changed string onto the stream"
const enqueue_after = function(string_fn) {
    return function(buffer) {
        const value = string_fn.call(buffer.toString()) + '\n';
        this.queue(value); // This only works with through, not with through2
    };
};

process.stdin
    .pipe(split())
    .pipe(through(alternate_fn(
        enqueue_after(String.prototype.toLowerCase),
        enqueue_after(String.prototype.toUpperCase))))
    .pipe(process.stdout);
