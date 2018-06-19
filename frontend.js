const express = require('express');
const hbs = require('hbs');
const vote = require('./handlers/vote.js')
const axios = require('axios');
var app = express();

var listenOn = 8080;
var healthCheck = false;
var livenessProbe = false;

var answers = {};

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use('/public', express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "The app works correctly"
    });
});

app.get('/isHealthy', (req,res) => {
    res.render('healthCheck.hbs', {
        pageTitle: 'Check health of application',
        healthCheck: healthCheck
    })
});

app.get('/isAlive', (req,res) => {
    res.render('livenessProve.hbs', {
        pageTitle: 'Check readiness of application',
        livenessProbe: livenessProbe 
    })
});

app.get('/healthCheck', (req, res) => {
    if (healthCheck) {
        res.setHeader('READINESS-PROBE',"READY");
        res.writeHead(200);
        res.send();
    }
    else {
        res.setHeader('READINESS-PROBE',"NOT_READY");
        res.writeHead(404);
        res.send();
    }
});

app.get('/livenessProbe', (req, res) => {
    if (livenessProbe) {
        res.setHeader('LIVENESS-PROBE',"READY");
        res.writeHead(200);
        res.send();
    }
    else {
        res.setHeader('LIVENESS-PROBE',"NOT_READY");
        res.writeHead(404);
        res.send();
    }
});

app.get('/setAsNotHealthy', (req, res) => {
    healthCheck = false;
    setTimeout(() => {
        healthCheck = true;
      }, 10000);
    res.writeHead(200);
    res.send();
});

app.get('/setAsHealty', (req, res) => {
    healthCheck = true;
    res.writeHead(200);
    res.send();
});

app.get('/setAlive', (req, res) => {
    livenessProbe = true;
    res.writeHead(200);
    res.send()
});

app.get('/setDead', (req, res) => {
    livenessProbe = false;
    res.writeHead(200);
    res.send()
});

var url = "http://localhost:8090";

app.get('/vote', (req, res) => {
    //put a call here
    axios.get(`${url}/vote?contest=${req.query.contest}&preference=${req.query.preference}`).then((reponse) => {
        res.writeHead(200);
        res.send()
    }).catch((e)  => {
        console.log(`Error occurred ${e}`);
        res.writeHead(404);
        res.send();
    });
});


app.get('/display', (req, res) => {
    //put a call here
    var results = vote.getContestVotesAsArrays(req.query.contest);
    axios.get(`${url}/vote?getResults=${req.query.contest}&preference=${req.query.preference}`).then((response) => {
        if (req.query.contest) {
            res.render('displayVotes.hbs', {
                contest: `'${req.query.contest}'`,
                data: `[${results[0]}]`,
                labels: `[${results[1]}]`
            });
        }
        else {
            res.writeHead(404);
            res.send()
        }
    }).catch((e)  => {
        console.log(`Error occurred ${e}`);
        res.writeHead(404);
        res.send();
    });
});

app.listen(listenOn, () => {
    console.log(`Server is now listening on ${listenOn}`);
    healthCheck = true;
    livenessProbe = true;

    // setInterval(() => {
    //     console.log('can this be a way to offload the file system');
    //   }, 1000);
});
