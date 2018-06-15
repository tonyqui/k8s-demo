const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

var listenOn = 8080;
var healthCheck = false;
var livenessProbe = false;

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
        res.writeHead(200);
        res.send();
    }
    else {
        res.writeHead(404);
        res.send();
    }
});

app.get('/setAsNotHealthy', (req, res) => {
    healthCheck = false;
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
    console.log(req.query);
});

app.get('/display', (req, res) => {
    var data = {
            datasets: [{
            data: [10, 20, 30]
            }],
        };
    res.render('displayVotes.hbs', {
       data: data
    });
});

app.listen(listenOn, () => {
    console.log(`Server is now listening on ${listenOn}`);
    healthy = true;
    livenessProbe = true;
});