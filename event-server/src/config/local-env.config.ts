const jwtConfig = {
  JWT_SECRET_KEY: 'jwt-secret-key',
};

const MongoConfig = {
  MONGODB_URI: 'mongodb://localhost:27018',
  MONGO_INITDB_ROOT_USERNAME: 'root',
  MONGO_INITDB_ROOT_PASSWORD: 'eventpass',
};

export default () => {
  if (process.env.NODE_ENV !== 'development') return {};

  return {
    ...jwtConfig,
    ...MongoConfig,
  };
};
