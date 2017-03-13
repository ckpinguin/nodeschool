var through = require('through2');
var http = require('http');

function write(buffer, encoding, next) {
    this.push(buffer.toString().toUpperCase());
    next();
}

function end(done) {
    done();
}

var stream = through(write, end);

var server = http.createServer(function(req, res) {
    if (req.method === 'POST') {
        req.pipe(stream).pipe(res);
    }
});
server.listen(process.argv[2]);
