// call it like this: `tail -n +50000 /usr/share/dict/american-english | head -n10 | node lines.js `
// the `unshift` helps when we read too much (over \n).
// Normally, we should use module `split` instead of doing this ;-)

var offset = 0;

process.stdin.on('readable', function () {
    var buf = process.stdin.read();
    if (!buf) return;
    for (; offset < buf.length; offset++) {
        if (buf[offset] === 0x0a) {
            console.dir(buf.slice(0, offset).toString());
            buf = buf.slice(offset + 1);
            offset = 0;
            process.stdin.unshift(buf);
            return;
        }
    }
    process.stdin.unshift(buf);
});
