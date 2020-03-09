var fs = require('fs');
var text = fs.readFileSync('./test.txt').toString('utf-8');

const BIB = ['Crum', 'Smith'];

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
        var index = this.getMatchInfo()[0];
        var normalizedAuthor = this.getMatchInfo()[2].toLowerCase();
        var normalizedYear = this.getMatchInfo()[3].replace(/[\(]/, '').replace(/[\)]/, '');

        var citeKey = "\\cite"+ citeClass + "{" + normalizedAuthor + normalizedYear + "}" + " at index " + index;
        // Outputs '\citet{author0000} at index i'

        return citeKey
    }
}

function processText(text) {
    let paren_author_year = /\(([A-Z]\w*)\s(\d{4})\)/g;
    let author_paren_year = /([A-Z]\w*)\s(\(\d{4}\))/g;
    let str = text;

    var match_list = [];

    while ((match = author_paren_year.exec(str)) != null) {
        var bibOutput = new BibMatch(match, citeClass="p");

        match_list.push(bibOutput.getMatchInfo());
        console.log(bibOutput.getMatchInfo());
        console.log(bibOutput.buildCiteKey());
    }

    return match_list;
}

processText(text);
