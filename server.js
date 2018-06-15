const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

var listenOn = 8080;
var healthy = false;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "The app works correctly"
    });
});

app.get('/isHealthy', (req,res) => {
    res.render('isHealthy.hbs', {
        pageTitle: 'Check health of application',
        healthCheck: healthy
    })
})

app.get('/healthCheck', (req, res) => {
    if (healthy) {
        res.writeHead(200);
        res.send();
    }
    else {
        res.writeHead(404);
        res.send();
    }
})

app.get('/setAsUnhealthy', (req, res) => {
    healthy = false;
    res.writeHead(200);
    res.send();
})

app.listen(listenOn, () => {
    console.log(`Server is now listening on ${listenOn}`);
    healthy = true;
})