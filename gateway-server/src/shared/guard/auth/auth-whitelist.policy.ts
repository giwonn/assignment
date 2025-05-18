export const authWhitelistPolicy: Record<string, string[]> = {
  '/users': ['POST'],
  '/auth/login': ['POST'],
};
