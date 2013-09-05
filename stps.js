'use strict';
var lazydb = require('lazydb');
var credentials = lazydb('store/credentials.db');
var nextId = lazydb('store/nextid.db');
var express = require('express');
var app = express();
var exec = require('child_process').exec;

function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
}

function commit() {
  execute('cd store; git fetch; git add .; git commit -am "change"; git rebase origin/master; git push origin master', function() {});
}

function getNextId(cb) {
  nextId.get('nextId', function(err,data) {
    if(err) { data = {id: 1}; }
    nextId.set('nextId', {id: data.id+1}, function(err) {
      commit();
      if(!err) {
        cb(data.id);
      }
    });
  });
}

app.configure(function() {
  app.use(express.bodyParser()); // used to parse JSON object given in the request body
});

app.use(express.static(__dirname + '/dist'));

app.get('/api/credentials/:id', function (request, response) {
  if(request.params.id === 'all') {
    credentials.getAll(function (results) {
      response.json(results);
    });
  }
  else {
    credentials.get(request.params.id, function(err,data) {
      response.json(data);
    });
  }
});

app.post('/api/credentials', function (request, response) {
  console.log(request.body);
  if(request.body.id) {
    credentials.set(request.body.id, request.body, function(err) {
      commit();
      if(!err) { response.send(200); }
    });
  }
  else {
    getNextId(function(id) {
      request.body.id = id;
      credentials.set(id, request.body, function(err) {
        commit();
        if(!err) { response.send(200); }
      });
    });
  }
});

app.listen(8080);
