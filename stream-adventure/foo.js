
function foo() {
    var bar;
    quux = 0;
    function zip() {
        var quux;
        bar = true;
    }
    return zip;
}
