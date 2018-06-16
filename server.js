const express = require('express');
const hbs = require('hbs');
const vote = require('./handlers/vote.js')
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
        res.setHeader('READINESS_PROBE',"READY");
        res.writeHead(200);
        res.send();
    }
    else {
        res.setHeader('READINESS_PROBE',"NOT_READY");
        res.writeHead(404);
        res.send();
    }
});

app.get('/livenessProbe', (req, res) => {
    if (livenessProbe) {
        res.setHeader('LIVENESS_PROBE',"READY");
        res.writeHead(200);
        res.send();
    }
    else {
        res.setHeader('LIVENESS_PROBE',"NOT_READY");
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

app.get('/vote', (req, res) => {
    vote.vote(req.query.contest, req.query.preference)
    res.writeHead(200);
    res.send()
});

app.get('/getResults', (req, res) => {
    var results = vote.getContestVotesAsArrays(req.query.contest);
    if (req.query.contest) {
        res.send({
            data: `[${results[0]}]`,
            labels: `[${results[1]}]`
        })
    }
    else {
        res.send();
    }
});

app.get('/display', (req, res) => {
    var results = vote.getContestVotesAsArrays(req.query.contest);
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
});

app.listen(listenOn, () => {
    console.log(`Server is now listening on ${listenOn}`);
    healthCheck = true;
    livenessProbe = true;
});