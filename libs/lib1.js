// Library example

module.exports = function (a, b) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;

    a = Number(a);
    b = Number(b);

    return a + b;
};
