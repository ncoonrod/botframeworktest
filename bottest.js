var restify = require('restify');
var builder = require('botbuilder');
var port = 9042;

var server = restify.createServer();
server.use(restify.bodyParser());

server.listen(port, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var fs = require ("fs");
var configFile = fs.readFileSync ("./testconfig.json");
var config = JSON.parse (configFile);

var connector = new builder.ChatConnector({
    appId: config.appId,
    appPassword: config.appPassword
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {    
	session.send("yep1");
});

/*
var express = require ("express");
var expressServer = express ();
var port = 9042;
var fs = require ("fs");
var configFile = fs.readFileSync (__dirname + "/testconfig.json");
var config = JSON.parse (configFile);
var credentials = {
		key: fs.readFileSync (config.key), 
		cert: fs.readFileSync (config.cert), 
		ca: fs.readFileSync (config.ca)
	};

var server = require ("https").createServer (credentials, expressServer);
var serverIO = require ("socket.io")(server);
server.listen (port);
var cookieParser = require ("cookie-parser");
var bodyParser = require ("body-parser");
var session = require ("express-session");
expressServer.use (cookieParser ());
expressServer.use (bodyParser.urlencoded ({ extended: true }));
expressServer.get ("/", function (req, res)
	{
		res.send ("Derp");
	});
// A bunch of Socket.io stuff is done here.

var builder = require ("botbuilder");
var connector = new builder.ChatConnector ({
				appId: config.appId, 
				appPassword: config.appPassword
			});
expressServer.post ("/api/messages", connector.listen ());

var bot = new builder.UniversalBot (connector);
bot.dialog ("/", function (session, args)
	{
		console.log ('yep1');
	});

*/

