const concurrently = require('concurrently');

concurrently([
  { command: 'cd gateway-server && npm install', name: 'gateway' },
  { command: 'cd auth-server && npm install', name: 'auth' },
  { command: 'cd event-server && npm install', name: 'event' },
]);
