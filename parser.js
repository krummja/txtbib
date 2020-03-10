var fs = require('fs');
var text = fs.readFileSync('./test.txt').toString('utf-8');


function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}


function buildCiteKey(match, citeClass) {
    var citeKey = "";
    var normalizedAuthor = match[1].toLowerCase();
    var normalizedYear = match[2].replace(/[\(]/, '').replace(/[\)]/, '');

    citeKey = "\\cite"+ citeClass + "{" + normalizedAuthor + normalizedYear + "}";

    return citeKey;
}


function parsePrefix(text) {
    const prefixed_author = /(von|van|de)\s[A-Z]\w*/g;

    var str = text;
    var deprefixed = "";

    while ((match = prefixed_author.exec(str)) != null) {
        deprefixed = match[0].replace(" ", "").toLowerCase();
        deprefixed = deprefixed.charAt(0).toUpperCase() + deprefixed.slice(1);

        str = replaceString(match[0], deprefixed, str);
    }

    return str;
}


function multiAuthor(text) {
    const multi_author = /([A-Z]\w*)\s((\&)|(and))\s([A-Z]\w*)/g;

    var str = text;
    var demultied = "";

    while ((match = multi_author.exec(str)) != null) {
        demultied = match[0]
        demultied = demultied.split(match[0]).join(match[1] + "etal");

        str = replaceString(match[0], demultied, str)
    }

    return str;
}


function processText(text) {
    const paren_author_year = /\(([A-Z]\w*)\s(\d{4})\)/g;
    const author_paren_year = /([A-Z]\w*)\s(\(\d{4}\))/g;
    const author_year = /([A-Z]\w*)\s(\d{4})/g;

    var str = text;

    str = parsePrefix(str);
    str = multiAuthor(str);

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

    while ((match = author_year.exec(str)) != null) {
        citeClass = "alt";
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
