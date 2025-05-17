import { LoginResult } from '@/auth/application/dto/login.result';

export class LoginResponse {
  accessToken: string;

  public static from(result: LoginResult): LoginResponse {
    const response = new LoginResponse();
    response.accessToken = result.accessToken;
    return response;
  }
}
