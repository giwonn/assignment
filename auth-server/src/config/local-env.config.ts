const jwtConfig = {
  JWT_SECRET_KEY: 'jwt-secret-key',
};

const MongoConfig = {
  MONGODB_URI: 'mongodb://localhost:27017',
  MONGO_INITDB_ROOT_USERNAME: 'root',
  MONGO_INITDB_ROOT_PASSWORD: 'authpass',
};

export default () => {
  if (process.env.NODE_ENV !== 'development') return {};

  return {
    ...jwtConfig,
    ...MongoConfig,
  };
};
