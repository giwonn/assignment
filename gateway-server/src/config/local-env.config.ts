const jwtConfig = {
  JWT_SECRET_KEY: 'jwt-secret-key',
};

const serverConfig = {
  AUTH_SERVICE_URL: 'http://localhost:3001',
  EVENT_SERVICE_URL: 'http://localhost:3002',
};

export default () => {
  if (process.env.NODE_ENV !== 'development') return {};

  return {
    ...jwtConfig,
    ...serverConfig,
  };
};
