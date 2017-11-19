require('colors');
const express = require('express');
const mongoose = require('mongoose');
const util = require('util');
const bodyParser = require('body-parser');

// Création d'une application ExpressJS
const app = express();

app.use('/', bodyParser.json());

const collaborateur = require('./CollaborateurController');

app.use('/', function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next()
})

app.get('/collaborateurs', collaborateur.findAll);

app.get('/collaborateurs/:id', collaborateur.findById);

app.post('/collaborateur', collaborateur.create);

app.put('/collaborateur/:id', collaborateur.update);

app.delete('/collaborateur/:id', collaborateur.remove);

/*
 Configuration
 */

app.set('ip', 'localhost');
app.set('port', 1337);

// Indique à Mongoose que les promesses à utiliser sont celles par défaut dans Node.js (objet global)
mongoose.Promise = global.Promise;

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const appListen = (app, port, ip) => {
    return new Promise((resolve, reject) => {
        app.listen(port, ip, resolve)
    })
};

// Connexion à la base de données MONGO,
mongoose
    .connect('mongodb://localhost:27017/intranet', {useMongoClient:true})
    .then( () => console.log('MongoDB : Connexion établie'.trap.bgGreen) )
    .then( appListen(app, app.get('port'), app.get('ip')) )
    .then( () => console.log(` App Started on http://${app.get('ip')}:${app.get('port')} `.trap.bgGreen) )
    .catch(err => console.log(err.message.red));
