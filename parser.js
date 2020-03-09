var fs = require("fs");
var text = fs.readFileSync("./test.txt").toString("utf-8");
var textByLine = text.split("\n");

const BIB = ['Crum', 'Smith'];

const YEAR = new RegExp(/\d{4}/);
const PAREN_YEAR = new RegExp(/\(\d{4}\)/);
const AUTHOR = new RegExp(/[A-Z]\w*/);
const PAREN_AUTHOR_YEAR = new RegExp(/\([A-Z]\w*\s\d{4}\)/);
const PRETEXT_PAREN_AUTHOR_YEAR = new RegExp(/\(\w*\s[A-Z]\w*\s\d{4}\)/);
const ABBREV_PAREN_AUTHOR_YEAR = new RegExp(/\(\w*.\s[A-Z]\w*\s\d{4}\)/);
const BIB_LAST_FIRST = new RegExp(/[A-Z]{1}\w*,\s[A-Z]{1}\w*./);
const NEWLINE = new RegExp(/\w*.\n/);


function checkAgainst(arr, rex, bib) {

    var results = [];

    for (i = 0; i < arr.length; i++) {
        if (rex.test(arr[i]) == true) {
            if (bib.includes(arr[i])) {

                var match = {
                    "Author": arr[i],
                    "Index": i
                }
               
                results.push(match);
            } else {
                continue;
            }
        }
    }

    return results;
}


function processText(text, rex, bib) {

    var raw = text.replace(/\n/g, ' ');
    var nopunct = raw.replace(/\./g, '');
    var processed = nopunct.split(/[\(]|[\)]|[\s]/);

    var results = checkAgainst(processed, rex, bib);
    console.log(results);
    return results;
}

processText(text, AUTHOR, BIB);
