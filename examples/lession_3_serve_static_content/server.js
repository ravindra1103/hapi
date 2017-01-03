var Hapi = require('hapi');
var Inert = require('inert');

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
    reply('Hello Static file server!');
  }
});

server.register(Inert, function(err) {
      if (err) {
        throw err;
      }
      //To serve the file in root folder using reply.file
      server.route({
        method: 'GET',
        path: '/index.js',
        handler: function (request, reply) {
          reply.file('index.js');
        }
      });

      //To serve the file using file handler
      server.route({
        method: 'GET',
        path: '/about.js',
        handler: {
          file: 'about.js'
        }
      });

      //Serve files from public directory
      server.route({
          method: 'GET',
          path: '/{param*}',
          handler: {
              directory: {
                  path: 'public'
              }
          }
      });

      //Serve files from static directory as listing when request come from /list path
      server.route({
          method: 'GET',
          path: '/list/{param*}',
          handler: {
              directory: {
                  path: 'static',
                  listing: true
              }
          }
      });

      //Serve files from default directory as listing when request come from /default path
      //By default index.html or default.html will be picked up else listing is shown
      server.route({
          method: 'GET',
          path: '/default/{param*}',
          handler: {
              directory: {
                  path: 'default',
                  listing: true,
                  index: ['index.html', 'default.html']
              }
          }
      });

      // start your server
      server.start(function (err) {
        if (err) {
          throw err;
        }
        console.log('Server running at: ' + server.info.uri);
      });
});
