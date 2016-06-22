/**
 * Created by tgzhao on 16/6/22.
 */
var express = require("express"),
    config = require("./config"),
    urlRoute = require("./routes"),
    bodyParser = require('body-parser'),
    http = require("http");

var app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.set('port', config.port);

// app.configure(function(){
//     app.set('port', config.port);
//     app.use(bodyParser.urlencoded({ extended : true}));
//     app.use(bodyParser.json());
//     app.use(express.static(__dirname + '/public'));
//
// });

urlRoute.setRequestUrl(app);

app.on('close', function(errno) {
    console.log("node server closed");
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
