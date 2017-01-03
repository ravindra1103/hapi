var homeRoute = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/home',
      handler: function (request, reply) {
        reply('Hello  My Home route plugin!')
      }
    })
    next();
  }
};

homeRoute.register.attributes = {
  name: 'home-route',
  version: '1.0.0'
};

module.exports = homeRoute;
