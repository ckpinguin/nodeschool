var trumpet = require('trumpet');
var through = require('through2');

function write(buffer, encoding, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}

function end(done) {
    done();
}
var upper = through(write, end);

// It IS complicated, because trumpet is IN AND OUT!
// we are setting up the stream pipes on trSelector, while
// we are just piping stdin to tr and then to stdout, which
// is hard to grasp imho
var tr = trumpet();
var trSelector = tr.select('.loud');
var stream = trSelector.createStream();

stream.pipe(upper).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);
