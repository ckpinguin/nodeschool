var concat = require('concat-stream');

process.stdin
    .pipe(concat((buffer) => {
        //console.log(buffer);
        process.stdout.write(buffer.reverse());
    }));
