var Hapi = require('hapi');
var Good = require('good');
var HomeRoute = require('./home-route');

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
    reply('Welcome to Plugins tutorial!');
  }
});

//register plugins
server.register([
  {
      register: Good,
      options: {
          reporters: {
              console: [{
                  module: 'good-squeeze',
                  name: 'Squeeze',
                  args: [{
                      response: '*',
                      log: '*'
                  }]
              }, {
                  module: 'good-console'
              }, 'stdout']
          }
      }
  },
  {
    register: HomeRoute
  }
], function (err)  {
    if (err) {
        throw err;
    }
    // If the above step does not throw any error
    server.start(function(err) {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
