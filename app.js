var express = require('express');
var app = require('./server/server.js');

app.set('port', (process.env.PORT || 1337));
app.use('/',express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client'));
app.use('/data-view',express.static(__dirname +'/app'));

// app.get("/",function(req,/res){
//    console.log('__dirname', __dirname);
//    res('hello');
// })

console.log('listening on 1337');
app.listen(app.get('port'),function(){
  console.log("Node app is running at localhost: " + app.get('port'));
});
