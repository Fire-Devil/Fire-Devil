var express = require('express');
var app = require('./server/server.js');

//app.use('/',express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client'));


app.get("/",function(req,res){
   console.log('__dirname', __dirname);
   res('hello');
})

console.log('listening on 1337');
app.listen(1337);
