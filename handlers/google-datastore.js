const Datastore = require('@google-cloud/datastore');
const projectId = 'r-box-devops';
const datastoreKind = 'world-cup-contest'
const datastore = new Datastore({projectId: projectId,});

function getVote(contest, preference, callback) {
    const datastore = new Datastore({projectId: projectId,});
    const query = datastore.createQuery(datastoreKind);
    datastore
        .runQuery(query, function(err, results) {
            if (results){
                results.forEach(aContest => {
                    console.log(aContest);
                    if (aContest['contestName'] === contest) {
                         console.log(aContest);
                        callback('', aContest);
                    }
                    else {
                        callback('', 0);
                    }
                })
            }
        });
}

function insertVote(contest, preference) {
    const transaction = datastore.transaction();
    const voteKey = datastore.key([datastoreKind, contest]);

    transaction.run(function(err) {
    if (err) {
        res.end(err);
    }
    
        transaction.get(voteKey, function(err, entity) {
            if (err) {
                res.end(err);
            }

            if(entity) {
                console.log(`Got ${entity}`);
                if(entity[preference]) {
                    entity[preference] = parseInt(entity[preference]) + 1;
                }
                else {
                    entity[preference] = 1;
                }
            }
            else {
                entity = 
                [
                    {
                        name: preference,
                        value: '1'
                    },
                    {
                        name: 'contestName',
                        value: contest
                    }
                ]
            }

            transaction.save({
                key: voteKey,
                data: entity
            });

            transaction.commit();
        });
    });
}

module.exports.getVote = getVote;
module.exports.insertVote = insertVote;