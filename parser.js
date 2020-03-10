var fs = require('fs');
var text = fs.readFileSync('./test.txt').toString('utf-8');


// The 'exec' method searches for a RegExp match and returns an array, or null.
//     let re = /quick\s(brown).+?(jumps)/ig;
//     let result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
//
//  result[0] === "Quick Brown Fox Jumps"
//  result[1] === "Brown"
//  result[2] === "Jumps"
//
// Successive matches can be found as follows:
//
//      let myRe = /ab*/g;
//      let str = 'abbcdefabh';
//      let myArray;
//      while ((myArray = myRe.exec(str)) !== null) {
//          let msg = 'Found ' + myArray[0] + '. ';
//          msg += 'Next match starts at ' + myRe.lastIndex;
//          console.log(msg);
//      }




function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}

// Rather than simply REGEXing for whole strings at once, what I need is a function that will check for
// the more complex cases. This function will then assemble the REGEX, either in the case that:
// (A) it has found complex cases, thus splice in the correct REGEX, then proceed with basic cases, or
// (B) it has found no complex cases, proceed with the basic REGEX


function buildCiteKey(match, citeClass) {
    var citeKey = "";
    var normalizedAuthor = match[1].toLowerCase();
    var normalizedYear = match[2].replace(/[\(]/, '').replace(/[\)]/, '');

    citeKey = "\\cite"+ citeClass + "{" + normalizedAuthor + normalizedYear + "}";

    return citeKey;
}


function parsePrefix(text) {
    // I want to check for surname prefixes before parsing a name, so that we can override
    // the simpler case if need be.
    var str = text;
    var deprefixed = "";
    const prefixed_author = /(von|van|de)\s[A-Z]\w*/g;


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
