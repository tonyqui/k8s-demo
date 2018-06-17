const fs = require('fs');
const fileName = 'files/votes.json'

var fetchVotesFromFile = () => {
    try {
        var votes = fs.readFileSync(fileName);
        console.log(`Those are the votes ${JSON.stringify(votes)}`);
        if (votes.length > 0 ) {
            return JSON.parse(votes);
        } else {
            return {};
        }
    } catch(e) {
        console.log(`Error occurred: ${e}`);
        return {};
    }
}

var saveVotesToFile = (votes) => {
    console.log(`Writing this to file \n ${JSON.stringify(votes)}`);
    fs.writeFileSync(fileName, JSON.stringify(votes));
}

var vote = (aContest, aVote) => {
    var votes = fetchVotesFromFile();
    console.log(`Contest -> ${aContest} \n aVote -> ${aVote}\n`);
    console.log(`Fetched vote -> ${votes}`);
    if (!votes[aContest]) {
        console.log('inside first if');
        votes[aContest] = {};
        if (!votes[aContest][aVote]) {
            console.log('inside second if');
            votes[aContest][aVote] = 1;
        }
    }
    else {
        votes[aContest][aVote] = votes[aContest][aVote]+1;
    }
    saveVotesToFile(votes);
}

var getVotes = () => {
    return fetchVotesFromFile();
}

var getContestVotesAsArrays = (contest) => {
    var votes = fetchVotesFromFile();
    var aContest = votes[contest];
    var results = [];
    if ( typeof aContest !== 'undefined' && Object.keys(aContest).length > 0) {
        console.log(votes);
        var values = Object.keys(aContest).map(function(key){
            return aContest[key];
        });
        var keys = Object.keys(aContest).map(function(key){
            return `'${key}'`;
        });
        results = [ values, keys ];  
    }
    console.log(`Returning: ${results}`);
    return results;
}

module.exports.vote = vote;
module.exports.getVotes = getVotes;
module.exports.getContestVotesAsArrays = getContestVotesAsArrays;