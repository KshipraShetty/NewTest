const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8080,
});

if (!module.parent) {
  server.start((error) => {
    if (error) {
      throw error;
    }
    console.log('Server connected!');
  });
}
