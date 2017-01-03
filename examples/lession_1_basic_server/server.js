var Hapi = require('hapi');

// create new server instance
var server = new Hapi.Server();

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000
});

// add basic route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello World!');
  }
});

// add home route
server.route({
  method: 'GET',
  path: '/home',
  handler: function (request, reply) {
    reply('Hello Home!');
  }
});

//add param route
server.route({
  method: 'GET',
  path: '/hello/{username}',
  handler: function (request, reply) {
     // Never forget to encode the values coming from the client
     reply('Hello, ' + encodeURIComponent(request.params.username) + '!');
  }
});

//add optional param route
server.route({
  method: 'GET',
  path: '/hi/{username?}',
  handler: function (request, reply) {
     var name = (request.params.username) ?
          encodeURIComponent(request.params.username) : 'stranger';
     reply('Hi, ' + name + '!');
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: function(request, reply) {
    reply("other route");
  }
});
// start your server
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at: ' + server.info.uri);
});
