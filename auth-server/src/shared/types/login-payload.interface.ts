interface JwtPayload {
  iat: number;
  exp: number;
}

export interface UserPayload {
  email: string;
  roles: string[];
}

export interface AuthPayload extends UserPayload, JwtPayload {}
