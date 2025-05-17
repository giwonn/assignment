const jwtConfig = {
  JWT_PUBLIC_KEY: 'jwt-public-key',
  JWT_PRIVATE_KEY: 'jwt-private-key',
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
