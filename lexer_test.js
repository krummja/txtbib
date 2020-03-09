var Lexer = require("lex");

var row = 1;
var col = 1;

var lexer = new Lexer(function (char) {
    throw new Error("Unexpected character at row " + row + ", col " + col + ": " + char);
});

lexer.addRule(/\n/, function () {
    row++;
    col = 1;
}, []);

lexer.addRule(/./, function () {
    this.reject = true;
    col++;
}, []);

lexer.input = "hello world!";

lexer.lex();
