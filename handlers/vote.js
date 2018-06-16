var votes = {};

var vote = (aContest, aVote) => {
    if (!votes[aContest]) {
        votes[aContest] = {};
    }
    if (!votes[aContest][aVote]) {
        votes[aContest][aVote] = 1;
    }
    else {
        votes[aContest][aVote] = votes[aContest][aVote]+1;
    }
}

var getVotes = () => {
    return votes;
}

var getContestVotesAsArrays = (contest) => {
    var aContest = votes[contest];
    var results = [];
    if ( Object.keys(votes).length > 0) {
        var values = Object.keys(aContest).map(function(key){
            return aContest[key];
        });
        var keys = Object.keys(aContest).map(function(key){
            return `'${key}'`;
        });
        results = [ values, keys ];  
    }
    return results;
}

module.exports.vote = vote;
module.exports.getVotes = getVotes;
module.exports.getContestVotesAsArrays = getContestVotesAsArrays;