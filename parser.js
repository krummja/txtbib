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

    var match_list = [];

    // Author (2020)
    while ((match = paren_author_year.exec(str)) != null) {
        var bibOutput = new BibMatch(match, citeClass="p");

        var citeKey = bibOutput.buildCiteKey();
        var output = replaceString(match[0], citeKey, text);
    }

    // (Author 2020)
    while ((match = author_paren_year.exec(str)) != null) {
        var bibOutput = new BibMatch(match, citeClass="t");

        var citeKey = bibOutput.buildCiteKey();
        var output = replaceString(match[0], citeKey, text);
    }

    return match_list;
}


function writeToFile(citeDictionary, text) {
    var str = text;
    var dictionary = citeDictionary;

    // fs.writeFile('output.tex', str, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved.');
    // })

    var processed = replaceString('Crum', 'Ramchand', str);
}

var match_list = processText(text);
writeToFile(match_list, text);
