const concurrently = require('concurrently');

concurrently([
  { command: 'npm run start:dev --workspace=gateway-server', name: 'gateway' },
  { command: 'npm run start:dev --workspace=auth-server', name: 'auth' },
  { command: 'npm run start:dev --workspace=event-server', name: 'event' },
]);
