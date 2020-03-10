var fs = require('fs');
var text = fs.readFileSync('./test.txt').toString('utf-8');


function buildCiteKey(match, citeClass) {
    var citeKey = "";
    var normalizedAuthor = match[1].toLowerCase();
    var normalizedYear = match[2].replace(/[\(]/, '').replace(/[\)]/, '');
    var citeKey = "\\cite" + citeClass + "{" + normalizedAuthor + normalizedYear + "}";
    return citeKey;
}


function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}


function processText(text) {
    const paren_author_year = /\(([A-Z]\w*)\s(\d{4})\)/g;
    const author_paren_year = /([A-Z]\w*)\s(\(\d{4}\))/g;
    var str = text;

    while ((match = paren_author_year.exec(str)) != null) {
        citeClass = "p";
        var citeKey = buildCiteKey(match, citeClass);
        str = replaceString(match[0], citeKey, str);
    }

    while ((match = author_paren_year.exec(str)) != null) {
        citeClass = "t";
        var citeKey = buildCiteKey(match, citeClass);
        str = replaceString(match[0], citeKey, str);
    }

    return str;
}


function writeToFile(str) {
    fs.writeFile('output.tex', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved.');
    })
}

var processed = processText(text)
writeToFile(processed);
