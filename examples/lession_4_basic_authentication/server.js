'use strict';

var Bcrypt = require('bcrypt');
var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');

var server = new Hapi.Server();
server.connection({ port: 3000 });

//First, we define our users database, which is a simple object in this example
var users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

// We define a validation function, which is a feature specific to
//hapi-auth-basic and allows us to verify that the user has provided valid credentials
var validate = function (request, username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }
    Bcrypt.compare(password, user.password, function (err, isValid)  {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

//We register the plugin, which creates a scheme with the name of basic
server.register(Basic, function(err)  {
    if (err) {
        throw err;
    }

    //Once the plugin has been registered, we use server.auth.strategy()
    //to create a strategy with the name of simple that refers
    //to our scheme named basic
    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    //The last thing we do is tell a route to use the strategy named
    //simple for authentication.
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });

    server.start(function(err) {
        if (err) {
            throw err;
        }
        console.log('server running at: ' + server.info.uri);
    });
});
