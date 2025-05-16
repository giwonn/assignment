const concurrently = require('concurrently');

concurrently([
  { command: 'cd gateway-server && npm run start:dev', name: 'gateway' },
  { command: 'cd auth-server && npm run start:dev', name: 'auth' },
  { command: 'cd event-server && npm run start:dev', name: 'event' },
]);
