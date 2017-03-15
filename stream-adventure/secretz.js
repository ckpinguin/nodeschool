var tar = require('tar');
//var through = require('through2');
var crypto = require('crypto');
var zlib = require('zlib');
var concat = require('concat-stream');

var cipher = process.argv[2];
var pass = process.argv[3];

var parser = tar.Parse();

var stream = crypto.createDecipher(cipher, pass);

process.stdin
    .pipe(stream)
    .pipe(zlib.createGunzip())
    .pipe(parser);
    //.pipe(process.stdout);

parser.on('entry', function(e) {
    if (e.type !== 'File') return;
    var hasher = crypto.createHash('md5', { encoding: 'hex' });

    e.pipe(hasher).pipe(concat(function(hash) {
        console.log(hash + ' ' + e.path);
    }));
});
