var fs = require('fs');
var text = fs.readFileSync('./test.txt').toString('utf-8');

class BibMatch {
    constructor(matchData, citeClass="") {
        this.matchData = matchData;
        this.citeClass = citeClass;
    }

    getMatchInfo() {
        var matchIndex = this.matchData.index;
        var matchOutdex = matchIndex + this.matchData[0].length;
        var author = this.matchData[1];
        var year = this.matchData[2];
        var matchInfo = [matchIndex, matchOutdex, author, year];

        return matchInfo;
    }

    buildCiteKey() {
        var citeClass = this.citeClass
        var normalizedAuthor = this.getMatchInfo()[2].toLowerCase();
        var normalizedYear = this.getMatchInfo()[3].replace(/[\(]/, '').replace(/[\)]/, '');

        var citeKey = " \\cite"+ citeClass + "{" + normalizedAuthor + normalizedYear + "} ";

        return citeKey;
    }
}


function replaceString(oldS, newS, fullS) {
    return fullS.split(oldS).join(newS);
}


function processText(text) {
    const paren_author_year = /\(([A-Z]\w*)\s(\d{4})\)/g;
    const author_paren_year = /([A-Z]\w*)\s(\(\d{4}\))/g;
    var str = text;
    var results = [];

    while ((match = paren_author_year.exec(str)) != null) {
        citeClass = "p";
        results.push(match[0]);
    }

    while ((match = author_paren_year.exec(str)) != null) {
        citeClass = "t";
        results.push(match[0]);
    }

    console.log(results);
}

// Take the match results Array, process each item to output a citeKey array with members ['match text', citeKey].
// For each item in the citeKey array, do a conditional during replace.
// for i in citeKey, for j in results, if citeKey[i][0] == results[j], replaceString(results[j], citeKey[i][0], str)
// That might work...

function writeToFile(citeDictionary, text) {
    var str = text;

    // fs.writeFile('output.tex', str, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved.');
    // })

    // This works to replace instances of 'Crum' with 'Ramchand' in the input text.
    var processed = replaceString('Crum', 'Ramchand', str);
    console.log(processed);
}

var match_list = processText(text);
writeToFile(match_list, text);
