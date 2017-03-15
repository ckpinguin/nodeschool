var duplexer = require('duplexer2');
var through = require('through2').obj; // obj is needed to work!



module.exports = function(counter) {
    var counts = {};
    var input = through(write, end);

    function write(row, encoding, next) {
        counts[row.country] = (counts[row.country] || 0) + 1;
        next();
    }

    function end(done) {
        // setCounts() comes from counter because we are producing
        // an object which counter needs
        counter.setCounts(counts);
        done();
    }
    return duplexer({writableObjectMode:true}, input, counter);
};
