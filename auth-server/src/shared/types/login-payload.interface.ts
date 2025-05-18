interface JwtPayload {
  iat: number;
  exp: number;
}

export interface UserPayload {
  sub: string;
  roles: string[];
}

export interface AuthPayload extends UserPayload, JwtPayload {}
